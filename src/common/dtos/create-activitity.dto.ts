import { IsString } from 'class-validator';
export class UserActivityDto {
  @IsString()
  actorname?: string;
  @IsString()
  action?: string;
  @IsString()
  actiontype?: string;
  @IsString()
  status?: string;
  @IsString()
  actiondate?: Date;
}
