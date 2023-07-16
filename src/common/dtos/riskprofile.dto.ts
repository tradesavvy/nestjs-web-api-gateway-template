export class DeleteRiskProfileDto {
  userName: string;
  riskProfileId: string;
}

export class CreateRiskProfileDto {
  profileName: string;
  userName: string;
  tolerance: number;
  scalpProfit: number;
  maxLossPerTrade: number;
  lots: number;
  fixedQuantiy: boolean;
  fixedProfit: boolean;
  targetPoint: number[];
  targetPercentage: number;
  targetPointSelected: number;
  slPercentage: number;
  slice: number;
  fundUtil: number;
}
export class UpdateRiskProfileDto {
  riskProfileId?: string;
  profileName: string;
  userName?: string;
  tolerance: number;
  scalpProfit: number;
  lots: number;
  maxLossPerTrade: number;
  fixedQuantiy: boolean;
  fixedProfit: boolean;
  targetPoint: number[];
  targetPercentage: number;
  targetPointSelected: number;
  slPercentage: number;
  slice: number;
  fundUtil: number;
}
export class DeleteUserRiskProfileDto {
  userName: string;
  riskProfileId: string;
}
