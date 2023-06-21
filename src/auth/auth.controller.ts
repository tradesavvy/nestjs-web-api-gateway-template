import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { Observable, lastValueFrom } from 'rxjs';
import { CreateUserDTO } from 'src/common/dtos/create-user.request.dto';
import { UserResponseDto } from 'src/common/dtos/user.response.dto';
import { UserDeletedEvent } from 'src/common/event/user.deleted.event';
import { UserLoginEvent } from 'src/common/event/user.login.event';
import { UserRegisterEvent } from 'src/common/event/user.register.event';
import { UserVerifiedEvent } from 'src/common/event/user.verify.event';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { ReferralService } from 'src/referral/referral.service';

@Controller()
@ApiTags('Auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly referralService: ReferralService,
    private readonly emitter: EventEmitter2,
  ) {}

  // @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('isRemember') isRemember = false,
    @Res() res: Response,
  ) {
    const emailFromReq = email;
    const payload = {
      email: email,
      password: password,
      isRemember: isRemember,
    };
    this.logger.log('login payload: ' + JSON.stringify(payload));
    const enrichedUserObservable = await this.authService.getUserByEmail(
      payload,
    );

    const enrichedUser = await lastValueFrom(enrichedUserObservable);
    this.logger.log(
      'Received enrichedUser from auth for verification: ' +
        JSON.stringify(enrichedUser),
    );

    if (enrichedUser.status === 'error') {
      throw new UnauthorizedException(enrichedUser.message);
    }

    const user = enrichedUser.data;
    this.logger.log('Received request for login: ' + emailFromReq);
    const jwtTokenObj = this.authService.generateJWTToken(
      emailFromReq,
      user.userName!,
      isRemember,
    );

    const userResponseDto = new UserResponseDto();

    userResponseDto.userName = user.userName || '';
    userResponseDto.email = user.email || '';
    userResponseDto.profileImgUrl = user.profileImgUrl || '';
    userResponseDto.accessToken = jwtTokenObj.access_token;
    userResponseDto.isNewRegister = false;
    //generate an login event
    this.logger.log('emitting UserLoginEvent... ');
    this.emitter.emit('user.login', new UserLoginEvent(user.userName));
    return res.status(enrichedUser.statusCode).json({
      status: enrichedUser.status,
      data: userResponseDto,
    });
  }

  @Post('2fa/generate')
  @UseGuards(AuthGuard('jwt'))
  async register2FA(@Res() response: Response, @Req() request: any) {
    const { otpAuthUrl } =
      await this.authService.generateTwoFactorAuthenticationSecret(
        request.user,
      );

    return response.json(
      await this.authService.generateQrCodeDataURL(otpAuthUrl),
    );
  }

  @Post('2fa/turn-on')
  @UseGuards(AuthGuard('jwt'))
  async turnOnTwoFactorAuthentication(@Req() req: any, @Body() body: any) {
    console.log(req.user, 'user');
    console.log(body, 'body');
    const isCodeValid =
      await this.authService.isTwoFactorAuthenticationCodeValid(
        body.twoFactorAuthenticationCode,
        req.user,
      );
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }
    await this.authService.turnOnTwoFactorAuthentication(req.user.userName);
  }

  @Post('2fa/authenticate')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  async authenticate(@Req() req: any, @Body() body: any) {
    console.log(req.user, 'user');
    console.log(body, 'body');
    const isCodeValid =
      await this.authService.isTwoFactorAuthenticationCodeValid(
        body.twoFactorAuthenticationCode,
        req.user.email,
      );
    console.log(isCodeValid, 'codeValid');
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }

    return this.authService.loginWith2fa(req.user);
  }

  @Post('register')
  async register(@Body() createUserDTO: CreateUserDTO): Promise<any> {
    try {
      this.logger.log(
        'AuthController sending createUserDTO... ' +
          JSON.stringify(createUserDTO),
      );
      let findReferral: any;
      if (createUserDTO.referralCode) {
        const result = await this.referralService.getReferralByReferralCode(
          createUserDTO.referralCode,
        );
        findReferral = await lastValueFrom(result);
        this.logger.log(`find Referral: ${JSON.stringify(findReferral)}`);
        if (findReferral.status === 'error' || findReferral.data === null) {
          throw new HttpException(
            'Referral code Not Found',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
      const userCreatedInAuth = await this.createUserInAuthModule(
        createUserDTO,
      );
      this.logger.log(
        'register user data from auth model: ' +
          JSON.stringify(userCreatedInAuth),
      );
      if (userCreatedInAuth.status === 'error') {
        throw new HttpException(
          createUserDTO.email + ' already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (userCreatedInAuth.data) {
        this.logger.log(`after reg from auth: ${userCreatedInAuth.data}`);
        createUserDTO.userName = userCreatedInAuth.data.userName;
        createUserDTO.password = userCreatedInAuth.data.password;
        createUserDTO.profileImgUrl =
          createUserDTO.profileImgUrl === undefined
            ? ''
            : createUserDTO.profileImgUrl;
        const userCreatedObservable =
          this.userService.createUser(createUserDTO);
        const userCreated = await lastValueFrom(userCreatedObservable);
        if (userCreated) {
          this.logger.log(
            'Adding user to Auth service' + JSON.stringify(userCreated),
          );
          if (createUserDTO.referralCode) {
            const restult = this.referralService.createUserReferral(
              createUserDTO.referralCode,
              createUserDTO.userName,
            );
            const userReferral = await lastValueFrom(restult);
            this.logger.log(
              `create User referral : ${JSON.stringify(userReferral)}`,
            );
          }
          this.emitUserCreatedEvent(createUserDTO);
          return userCreated;
        }
      } else {
        throw new HttpException(
          createUserDTO.email + ' already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  private emitUserCreatedEvent(createUserDTO: CreateUserDTO) {
    this.logger.log('emitting UserRegisterEvent... ');
    this.emitter.emit(
      'user.register',
      new UserRegisterEvent(createUserDTO.userName),
    );
  }

  private async createUserInAuthModule(createUserDTO: CreateUserDTO) {
    let userCreatedInAuth;
    try {
      const userCreatedInAuthObservable = await this.authService.addUser(
        createUserDTO,
      );
      userCreatedInAuth = await lastValueFrom(userCreatedInAuthObservable);
      return userCreatedInAuth;
    } catch (error) {
      this.logger.error('error creating user: ', error);
      if (error.code === 11000) {
        throw new HttpException(
          createUserDTO.email + ' already exists',
          HttpStatus.CONFLICT,
        );
      } else {
        throw new HttpException(
          createUserDTO.email + ' already exists',
          HttpStatus.CONFLICT,
        );
      }
    }
  }

  @Post('/:username/reset-password')
  async resetPassword(
    @Param('username') username: string,
    @Body('oldPassword') oldPassword: string,
    @Body('newPassword') newPassword: string,
    @Body('confirmPassword') confirmPassword: string,
    @Body('token') token = '',
    @Res() res: Response,
  ) {
    this.logger.log('Received request for reset password by user');
    const userResetPassInAuthObservable = await this.authService.resetPassword({
      username: username,
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
      token: token,
    });

    const userResetPassInAuth = await lastValueFrom(
      userResetPassInAuthObservable,
    );
    if (userResetPassInAuth.status === 'error') {
      return res.status(userResetPassInAuth.statusCode || 400).json({
        status: userResetPassInAuth.status,
        message: userResetPassInAuth.message,
      });
    }
    if (userResetPassInAuth) {
      const updateUserResetPassObservable = this.userService.resetPassword(
        userResetPassInAuth.data,
      );
      const updateUserResetPassword = await lastValueFrom(
        updateUserResetPassObservable,
      );
      if (updateUserResetPassword) {
        this.logger.log(
          'update reset password' + JSON.stringify(updateUserResetPassword),
        );
        return res.status(updateUserResetPassword.statusCode || 400).json({
          status: updateUserResetPassword.status,
          data: updateUserResetPassword.data,
          message:
            updateUserResetPassword.message || 'Password reset successfully',
        });
      }
    } else {
      throw new HttpException(
        'Unable to reset password ' + username,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('/:username/verify-email')
  async verifyEmail(
    @Param('username') username: string,
    @Body('token') token: string,
  ): Promise<any> {
    this.logger.log('UserController send verify email ... ');
    try {
      const result = this.authService.verifyEmail({
        username: username,
        token: token,
      });
      const httpResponse = await lastValueFrom(result);
      this.logger.log(`Emit user.verify`);
      this.emitter.emit('user.verify', new UserVerifiedEvent(username));
      this.logger.log('Response for verify email ... ' + httpResponse);
      return httpResponse;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:email/forgot-password')
  async forgotPassword(@Param('email') email: string): Promise<any> {
    this.logger.log('UserController send Forgot password ... ');
    return this.authService.forgotPassword({ email: email });
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:username')
  async deleteUser(@Param('username') username: string, @Req() req: any) {
    this.logger.log('Authenticate User: ' + JSON.stringify(req.user));
    if (username !== req?.user?.username) {
      this.logger.log('User Unauthorized:' + username);
      throw new UnauthorizedException();
    }
    this.logger.log('Received request for deleteUser: ' + username);
    const deletedUser = this.authService.deleteUser(username);
    this.logger.log('emitting UserDeletedEvent... ');
    this.emitter.emit('user.deleted', new UserDeletedEvent(username));
    return deletedUser;
  }

  @Get('/auth/ping')
  ping(): Observable<number> {
    this.logger.log('ping...');
    return this.authService.ping();
  }
}
