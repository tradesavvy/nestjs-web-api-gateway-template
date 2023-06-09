export class UpdateUserActionEvent {
  constructor(
    questId: string,
    username: string,
    frequency: string,
    isActionDone?: boolean,
  ) {
    (this.questId = questId || ''), (this.username = username);
    this.frequency = frequency;
    this.isActionDone = isActionDone || true;
  }
  questId: string;
  username: string;
  frequency: string;
  isActionDone: boolean;
}
