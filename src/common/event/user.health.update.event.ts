class UserHealthEvent {
  username: string;
  stepCount: number;
  energyBurned: number;
  distance: number;
  distanceUnit: string;
  workoutTime: number;
  lastUpdatedAt: Date;
}

export class UserHealthUpdateEvent {
  data: Array<UserHealthEvent>;
}
