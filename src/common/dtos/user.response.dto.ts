import { IsString } from 'class-validator';
export class UserResponseDto {
  @IsString()
  email?: string;
  @IsString()
  userName?: string;
  @IsString()
  profileImgUrl?: string;
  @IsString()
  accessToken?: string;

  isVerified?: boolean;

  isError?: boolean;

  isNewRegister?: boolean;

  isSocialSignin?: boolean;

  @IsString()
  errorMessage?: string;
}
