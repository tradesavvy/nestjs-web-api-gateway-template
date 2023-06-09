import { IsBoolean, IsString } from 'class-validator';

export class FeatureControlDTO {
  id?: string;
  @IsString()
  featureName: string;
  usersAccessible: any;
  @IsString()
  description: string;
  @IsBoolean()
  isAccess: boolean;
}
