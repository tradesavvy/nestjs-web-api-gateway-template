export class UserClaimEvent {
  constructor(username: string, gpyPoints: number, description: string) {
    this.username = username;
    this.gpyPoints = gpyPoints;
    this.description = description;
  }
  username: string;
  gpyPoints: number;
  description: string;
}
