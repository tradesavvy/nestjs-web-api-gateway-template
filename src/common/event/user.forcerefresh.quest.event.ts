export class UserForceRefreshQuestEvent {
  constructor(username: string) {
    this.username = username;
  }
  username: string;
  event?: string = 'force.refresh.quest';
}
