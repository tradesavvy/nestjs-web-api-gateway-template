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
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  phoneNumber: number;
  isVerified: boolean;
  dialCode: number;
  verificationToken: string;
  passwordToken: string;
  passwordTokenExpirationDate: Date;
  twoFactorAuthenticationSecret: string;
  isTwoFactorAuthenticationEnabled: boolean;
}
