/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Inject,
  Injectable,
  Logger,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateUserDTO } from 'src/common/dtos/create-user.request.dto';
import { ResponseDto } from 'src/common/dtos/response.dto';

@Injectable()
export class UserService implements OnApplicationBootstrap {
  private readonly logger = new Logger(UserService.name);

  constructor(
    // @ts-ignore
    @Inject('USER') private readonly userClient: ClientProxy,
  ) {}

  onApplicationBootstrap() {
    try {
      this.userClient
        .connect()
        .then((a) => {
          this.logger.log('user client connected');
        })
        .catch((err) => {
          this.logger.log('user client ' + JSON.stringify(err));
        });
    } catch (error) {}
  }

  createUser(createUserDTO: CreateUserDTO) {
    this.logger.log(
      'sending createUserDTO... ' + JSON.stringify(createUserDTO),
    );
    const pattern = { cmd: 'createUser' };
    return this.userClient.send<any>(pattern, createUserDTO);
  }

  resetPassword(payload: any) {
    const pattern = { cmd: 'resetPasswordForUser' };
    return this.userClient.send<any>(pattern, payload);
  }

  addUser(createUserDTO: CreateUserDTO): any {
    const pattern = { cmd: 'addUser' };
    this.logger.log(`Sending addUser ${JSON.stringify(createUserDTO)}`);
    return this.userClient.send<any>(pattern, createUserDTO);
  }

  ping(): Observable<number> {
    const pattern = { cmd: 'ping' };
    const payload = [1, 2, 3];
    return this.userClient.send<number>(pattern, payload);
  }
  getUserByMobileNumber(payload: any): any {
    const pattern = { cmd: 'getUserByMobileNumber' };
    this.logger.log('getUserByMobileNumber' + payload);
    return this.userClient.send<any>(pattern, { phoneNumber: payload });
  }

  getUserByUsername(payload: any): any {
    const pattern = { cmd: 'getUserByUsername' };
    this.logger.log('getUserByUsername' + payload);
    return this.userClient.send<any>(pattern, { username: payload });
  }

  userWhatsAppVerifyOtp(payload: any): Observable<ResponseDto> {
    const pattern = { cmd: 'userWhatsAppVerifyOtp' };
    this.logger.log('userWhatsAppVerifyOtp' + payload);
    return this.userClient.send<any>(pattern, payload);
  }

  disConnectWhatsAppUser(payload: any): Observable<ResponseDto> {
    const pattern = { cmd: 'disConnectWhatsAppUser' };
    this.logger.log('disConnectWhatsAppUser' + payload);
    return this.userClient.send<any>(pattern, payload);
  }

  connectTelegramUser(payload: any): Observable<ResponseDto> {
    const pattern = { cmd: 'connectTelegramUser' };
    this.logger.log('connectTelegramUser: ' + JSON.stringify(payload));
    return this.userClient.send<any>(pattern, payload);
  }

  disconnectTelegramUser(payload: any): Observable<ResponseDto> {
    const pattern = { cmd: 'disconnectTelegramUser' };
    this.logger.log('disconnectTelegramUser: ' + JSON.stringify(payload));
    return this.userClient.send<any>(pattern, payload);
  }

  updateUser(payload: any): any {
    const pattern = { cmd: 'updateUser' };
    this.logger.log('updateUser' + payload);
    return this.userClient.send<any>(pattern, payload);
  }

  getUserByEmailOrPhone(payload: any): any {
    const pattern = { cmd: 'getUserByEmailOrPhone' };
    this.logger.log('getUserByEmailOrPhone' + payload);
    return this.userClient.send<any>(pattern, { emailOrPhone: payload });
  }
  getActiveRiskProfileByUsername(payload: string): any {
    const pattern = { cmd: 'getActiveRiskProfileByUsername' };
    this.logger.log('getActiveRiskProfileByUsername' + payload);
    return this.userClient.send<any>(pattern, payload);
  }
}
