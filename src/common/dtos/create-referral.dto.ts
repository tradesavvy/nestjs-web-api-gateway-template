// create-referral.dto.ts

import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateOrUpdateReferralDto {
  @IsString()
  username: string;

  @IsNumber()
  myShare: number;

  @IsNumber()
  friendShare: string;

  @IsString()
  referralCode: string;

  @IsString()
  notes: string;

  @IsString()
  status: string;
}
