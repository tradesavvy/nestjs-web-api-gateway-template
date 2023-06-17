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
  maxLossPerDay: number;
  dayGoal: number;
  lots: number;
  quantityFactor: number;
  fixedQuantiy: boolean;
  fixedProfit: boolean;
  targetPoint: number[];
  targetPercentage: number;
  slPercentage: number;
}
export class UpdateRiskProfileDto {
  riskProfileId: string;
  profileName: string;
  userName: string;
  tolerance: number;
  scalpProfit: number;
  maxLossPerTrade: number;
  maxLossPerDay: number;
  dayGoal: number;
  lots: number;
  quantityFactor: number;
  fixedQuantiy: boolean;
  fixedProfit: boolean;
  targetPoint: number[];
  targetPercentage: number;
  slPercentage: number;
}
