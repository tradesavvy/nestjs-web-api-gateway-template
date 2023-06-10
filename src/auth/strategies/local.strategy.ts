import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { lastValueFrom } from 'rxjs';
import { UserRequestDto } from 'src/common/dtos/user.request.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    const userReq = new UserRequestDto();
    userReq.email = email;
    userReq.password = password;
    this.logger.log('at validateUserCredentials.. for user: ' + email);
    const userObservable = await this.authService.validateUserCredentials(
      userReq,
    );

    const enrichedUser = await lastValueFrom(userObservable);

    this.logger.log(
      'at validateUserCredentials.. for user: ' + JSON.stringify(enrichedUser),
    );
    if (!enrichedUser) {
      throw new UnauthorizedException();
    }
    return enrichedUser;
  }
}
