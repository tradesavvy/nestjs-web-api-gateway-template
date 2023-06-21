export class DeleteUserBrokerDto {
  userName: string;
  userBrokerId: string;
}

export class CreateUserBrokerDto {
  brokerName: string;
  userName: string;
  accountId: string;
  apiKey: string;
  apiSecret: string;
  appUrl: string;
}

export class UpdateUserBrokerDto {
  brokerName: string;
  userName: string;
  accountId: string;
  apiKey: string;
  apiSecret: string;
  appUrl: string;
  userBrokerId?: string;
}
export class UpdateSortOrderDto {
  userName?: string;
  sort: string[];
}
export class UserBroker {
  userName?: string;
  userBrokerId: string;
}
export class ConnectUserBroker {
  userBrokerId: string;
  accountId: string;
  accessToken: string;
  userName?: string;
}
