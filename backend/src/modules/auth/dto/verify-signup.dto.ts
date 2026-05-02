import { IsEmail, IsString, Length } from 'class-validator';

export class VerifySignupDto {
  @IsString()
  @IsEmail()
  email!: string;

  @IsString()
  @Length(6, 6, { message: 'OTP must be exactly 6 characters long' })
  code!: string;
}
