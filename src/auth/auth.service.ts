/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';
import { Observable, lastValueFrom } from 'rxjs';
import { CreateUserDTO } from 'src/common/dtos/create-user.request.dto';
import { UserRequestDto } from 'src/common/dtos/user.request.dto';
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private jwtService: JwtService,
    // @ts-ignore
    @Inject(ConfigService) private configService: ConfigService,
    // @ts-ignore
    @Inject('AUTH') private readonly authClient: ClientProxy,
    // @ts-ignore
    @Inject('USER') private readonly userClient: ClientProxy,
  ) {}

  async validateUserCredentials(userReq: UserRequestDto) {
    const pattern = { cmd: 'validateUserCredentials' };

    return this.authClient.send<string>(pattern, userReq);
  }

  getUserByEmail(payload: any): Observable<any> {
    const pattern = { cmd: 'getUserByEmail' };
    this.logger.log('getUserByEmail --> ' + JSON.stringify(payload));
    return this.authClient.send<any>(pattern, payload);
  }

  resetPassword(payload: any): Observable<any> {
    const pattern = { cmd: 'resetPassword' };
    return this.authClient.send<any>(pattern, payload);
  }

  verifyOTP(payload: any): Observable<any> {
    const pattern = { cmd: 'verifyOTP' };
    this.logger.log(payload);
    return this.authClient.send<any>(pattern, payload);
  }

  resentMailOTP(payload: any): Observable<any> {
    const pattern = { cmd: 'resentMailOTP' };
    this.logger.log(payload);
    return this.authClient.send<any>(pattern, payload);
  }

  resentMobileOTP(payload: any): Observable<any> {
    const pattern = { cmd: 'resentMobileOTP' };
    this.logger.log(payload);
    return this.authClient.send<any>(pattern, payload);
  }

  forgotPassword(payload: any): Observable<any> {
    const pattern = { cmd: 'forgotPassword' };
    this.logger.log(payload);
    return this.authClient.send<any>(pattern, payload);
  }

  generateJWTToken(email: string, username: string, isRemember: boolean) {
    const payload = { email, username };
    this.logger.log('Login Payload :' + JSON.stringify(payload));
    const sixMonthsInSeconds = 157680000;
    const secret = 'JWT_SECRET_KEY';
    // const secret = this.configService.get('JWT_SECRET_KEY');
    this.logger.log('secret from config: ' + secret);
    return {
      email: email,
      access_token: this.jwtService.sign(payload, { secret: secret }),
      expiredAt: isRemember
        ? Date.now() + sixMonthsInSeconds
        : Date.now() + 60000,
    };
  }

  generateJWT2FAToken(
    user: any,
    isTwoFactorAuthenticationEnabled: any,
    isTwoFactorAuthenticated: boolean,
    isRemember = true,
  ) {
    console.log(user, 'user');
    const username = user.userName;
    const email = user.email;
    const payload = { email, username };
    this.logger.log('Login Payload :' + JSON.stringify(payload));
    const sixMonthsInSeconds = 157680000;
    const secret = 'JWT_SECRET_KEY';
    // const secret = this.configService.get('JWT_SECRET_KEY');
    this.logger.log('secret from config: ' + secret);
    return {
      email: email,
      username: username,
      profileImgUrl: user.profileImgUrl,
      isTwoFactorAuthenticationEnabled: isTwoFactorAuthenticationEnabled,
      isTwoFactorAuthenticated: isTwoFactorAuthenticated,
      access_token: this.jwtService.sign(payload, { secret: secret }),
      expiredAt: isRemember
        ? Date.now() + sixMonthsInSeconds
        : Date.now() + 60000,
    };
  }

  async generateTwoFactorAuthenticationSecret(user: any) {
    const secret = authenticator.generateSecret();

    const otpAuthUrl = authenticator.keyuri(user.email, 'GAMEPAY', secret);
    console.log(user, 'user');
    const pattern = { cmd: 'setTwoFactorAuthenticationSecret' };
    const result = await this.authClient.send<any>(pattern, {
      username: user.username,
      secret: secret,
    });
    const result$ = await lastValueFrom(result);
    console.log(result$);

    return {
      secret,
      otpAuthUrl,
    };
  }

  async generateQrCodeDataURL(otpAuthUrl: string) {
    return toDataURL(otpAuthUrl);
  }

  async isTwoFactorAuthenticationCodeValid(
    twoFactorAuthenticationCode: string,
    email: any,
  ) {
    const pattern = { cmd: 'getUser' };
    const result = await this.authClient.send<any>(pattern, {
      email: email,
    });
    const user = await lastValueFrom(result);
    return authenticator.verify({
      token: twoFactorAuthenticationCode,
      secret: user.twoFactorAuthenticationSecret,
    });
  }

  async turnOnTwoFactorAuthentication(userName: any) {
    const pattern = { cmd: 'turnOnTwoFactorAuthentication' };
    await this.authClient.send<any>(pattern, { userName });
  }

  async loginWith2fa(userWithoutPsw: Partial<any>) {
    const pattern = { cmd: 'getUser' };
    const result = await this.authClient.send<any>(pattern, {
      email: userWithoutPsw.email,
    });
    const user = await lastValueFrom(result);

    const data = this.generateJWT2FAToken(
      user,
      !!user.isTwoFactorAuthenticationEnabled,
      true,
    );

    return {
      status: 'success',
      data: data,
    };
  }

  addUser(userCreated: CreateUserDTO): Observable<any> {
    const pattern = { cmd: 'addUser' };
    return this.authClient.send<any>(pattern, userCreated);
  }

  async deleteUser(username: string) {
    const pattern = { cmd: 'deleteUserCleanly' };
    const userDeleteInAuthObservable = await this.authClient.send<string>(
      pattern,
      username,
    );
    const userDeletePassInAuth = await lastValueFrom(
      userDeleteInAuthObservable,
    );
    this.logger.log('deleted user in auth module: ' + userDeletePassInAuth);
    return this.userClient.send<string>(pattern, username);
  }

  ping(): Observable<number> {
    const pattern = { cmd: 'ping' };
    const payload = [1, 2, 3];
    return this.authClient.send<number>(pattern, payload);
  }
}
