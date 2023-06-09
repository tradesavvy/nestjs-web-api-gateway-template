import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDTO {
  id: string;
  userName: string;
  email: string;
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
  profile: string;
  profileImgUrl: string;
  referralCode: string;
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  phoneNumber: number;
  isVerified: boolean;
  country: string;
  countryCode: string;
  dialCode: number;
  @IsString()
  gender: string;
  verificationToken: string;
  passwordToken: string;
  passwordTokenExpirationDate: Date;
  twoFactorAuthenticationSecret: string;
  isTwoFactorAuthenticationEnabled: boolean;
}
