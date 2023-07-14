// create-referral.dto.ts

import { IsString } from 'class-validator';

export class ReferralEarningDto {
  @IsString()
  username: string;

  @IsString()
  referralCode: string;

  @IsString()
  earning: number;
}
