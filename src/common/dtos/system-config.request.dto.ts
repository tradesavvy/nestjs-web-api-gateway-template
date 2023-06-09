import { IsString } from 'class-validator';

export class SystemConfigurationDTO {
  @IsString()
  id: string;
  @IsString()
  name: string;
  @IsString()
  domain: string;
  @IsString()
  source: string;
  @IsString()
  key: string;
  @IsString()
  value: string;
  @IsString()
  description: string;
  @IsString()
  createdBy: string;
  @IsString()
  modifiedBy: string;
}
