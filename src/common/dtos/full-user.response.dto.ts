import { IsEmail, IsNumber, IsPhoneNumber, IsString } from 'class-validator';
export class FullUserResponseDto {
  @IsEmail()
  email?: string;
  @IsString()
  userName?: string;
  @IsString()
  profileImgUrl?: string;

  @IsString()
  referralCode: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsPhoneNumber()
  phoneNumber: number;

  @IsString()
  country: string;

  @IsString()
  countryCode: string;

  @IsNumber()
  dialCode: number;

  @IsString()
  gender: string;

  likeGames: Array<any>;

  excitedGames: Array<any>;

  gameGenre: Array<any>;
}
