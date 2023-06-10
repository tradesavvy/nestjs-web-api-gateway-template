export class UserActionEvent {
  constructor(
    questId: string,
    username: string,
    platform: string,
    action: string,
    isActionDone?: boolean,
  ) {
    (this.questId = questId || ''), (this.username = username);
    this.platform = platform;
    this.action = action;
    this.isActionDone = isActionDone || true;
  }
  questId: string;
  username: string;
  platform: string;
  action: string;
  isActionDone: boolean;
}
