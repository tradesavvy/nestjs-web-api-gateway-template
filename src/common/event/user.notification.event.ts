export class UserNotificationEvent {
  sender: string;
  receiver: string;
  content: string;
  isRead = false;
}
