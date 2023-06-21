// create-referral.dto.ts

import { IsString, IsNumber } from 'class-validator';

export class CreateReferralDto {
  @IsString()
  username: string;

  @IsNumber()
  myShare: number;

  @IsNumber()
  friendShare: string;

  @IsString()
  notes : string;
    
}
