import {
  IsDate,
  IsEmail,
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Gender, Role } from '@prisma/client';

const LEVEL_VALUES = [
  'FIRST_YEAR',
  'SECOND_YEAR',
  'THIRD_YEAR',
  'FOURTH_YEAR',
  'FIFTH_YEAR',
  'GRADUATED',
  'POSTGRADUATED',
  'MEMBERSHIP',
] as const;

export class SignUpStudentDto {
  @IsString()
  full_name!: string;

  @IsString()
  username!: string;

  @IsString()
  @IsEmail()
  email!: string;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password!: string;

  @IsDate()
  DateOfBirth!: Date;

  @IsEnum(Gender)
  gender!: Gender;

  @IsEnum(Role)
  role!: Role;

  @IsOptional()
  @IsIn(LEVEL_VALUES)
  level?: (typeof LEVEL_VALUES)[number];

  @IsNumber()
  universityId!: number;

  @IsNumber()
  facultyId!: number;

  @IsOptional()
  @IsString()
  @IsPhoneNumber('EG')
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  address?: string;
}
