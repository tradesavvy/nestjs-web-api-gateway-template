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

@Injectable()
export class UserService implements OnApplicationBootstrap {
  private readonly logger = new Logger(UserService.name);

  constructor(
    // @ts-ignore
    @Inject('USER') private readonly userClient: ClientProxy,
  ) {}

  onApplicationBootstrap() {
    this.userClient.connect();
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
    return this.userClient.send<any>(pattern, payload);
  }
}
