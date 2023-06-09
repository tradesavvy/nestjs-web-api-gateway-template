export class UserRegisterEvent {
  constructor(username: string) {
    this.username = username;
  }
  username: string;
  event?: string = 'register';
}
