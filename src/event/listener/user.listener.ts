/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientProxy } from '@nestjs/microservices';
import { UserRegisterEvent } from 'src/common/event/user.register.event';

@Injectable()
export class UserEventListener {
  private readonly logger = new Logger(UserEventListener.name);
  constructor(
    // @ts-ignore
    @Inject('AUTH') private readonly authClient: ClientProxy,
  ) {}

  @OnEvent('user.register')
  handleUserRegisterEvent(event: UserRegisterEvent) {
    this.logger.log('recieved event' + JSON.stringify(event));
    this.logger.log('Emitting  UserRegisterEvent to authClient ');
    this.authClient.emit<string>('user_register', event);
  }
}
