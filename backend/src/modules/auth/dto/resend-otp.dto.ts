import { Purpose } from '@prisma/client';
import { IsEmail, IsEnum } from 'class-validator';

export class ResendOtpDto {
  @IsEmail()
  email!: string;

  @IsEnum(Purpose)
  purpose!: Purpose;
}
