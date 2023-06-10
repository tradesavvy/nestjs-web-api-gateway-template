import { IsString } from 'class-validator';
export class CreateSocialDto {
  @IsString()
  userName?: string;
  @IsString()
  socialMediaName?: string;
  @IsString()
  userHandle?: string;
}
