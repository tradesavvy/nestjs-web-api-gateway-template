export class UserDeletedEvent {
  constructor(username: string) {
    this.username = username;
  }
  username: string;
}
