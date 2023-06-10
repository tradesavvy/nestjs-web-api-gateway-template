export class UserLoginEvent {
  constructor(username: string) {
    this.username = username;
  }
  username: string;
  event?: string = 'login';
}
