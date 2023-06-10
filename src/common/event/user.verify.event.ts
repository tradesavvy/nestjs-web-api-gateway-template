export class UserVerifiedEvent {
  constructor(username: string) {
    this.username = username;
  }
  username: string;
}
