import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { SignUpStudentDto } from '../auth/dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../database/database.service';
import { Role, User } from '@prisma/client';

@Injectable()
export class UserManagementService {
  constructor(private readonly prisma: DatabaseService) {}
  async createStudent(dto: SignUpStudentDto): Promise<User> {
    const existingEmail = await this.findUserByEmail(dto.email);

    if (existingEmail) {
      if (existingEmail.isEmailVerified) {
        throw new ConflictException('Email is already registered and verified');
      }

      throw new ConflictException(
        'Email is already registered but not verified. Please verify your email or use a different one.',
      );
    }

    if (await this.findUserByUsername(dto.username)) {
      throw new ConflictException('Username is already taken');
    }

    if (dto.phoneNumber) {
      await this.validatePhoneNumber(dto.phoneNumber);
    }

    if (dto.dateOfBirth) {
      this.validateDateOfBirth(dto.dateOfBirth);
    }

    await Promise.all([
      this.validateUniversity(dto.universityId),
      this.validateFaculty(dto.facultyId),
    ]);

    this.checkPasswordStrength(dto.password);
    const hashedPassword = await this.hashPassword(dto.password);

    const user = await this.prisma.user.create({
      data: {
        full_name: dto.full_name,
        email: dto.email,
        password: hashedPassword,
        username: dto.username,
        DateOfBirth: new Date(dto.dateOfBirth),
        isEmailVerified: false,
        gender: dto.gender,
        role: Role.USER,
        level: dto.level,
        userInfo: {
          create: {
            address: dto.address || null,
            phoneNumber: dto.phoneNumber || null,
          },
        },
      },
    });
    return user;
  }

  async markEmailAsVerified(email: string) {
    return this.prisma.user.update({
      where: { email },
      data: { isEmailVerified: true },
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  private checkPasswordStrength(password: string): boolean {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      throw new BadRequestException(
        `Password must be at least ${minLength} characters long`,
      );
    }
    if (!hasUpperCase) {
      throw new BadRequestException(
        'Password must contain at least one uppercase letter',
      );
    }

    if (!hasLowerCase) {
      throw new BadRequestException(
        'Password must contain at least one lowercase letter',
      );
    }
    if (!hasNumber) {
      throw new BadRequestException(
        'Password must contain at least one number',
      );
    }
    if (!hasSpecialChar) {
      throw new BadRequestException(
        'Password must contain at least one special character',
      );
    }

    return true;
  }

  private async validatePhoneNumber(phoneNumber: string): Promise<void> {
    const phoneRegex = /^\+?[1-9][0-9]{7,14}$/;
    if (!phoneRegex.test(phoneNumber)) {
      throw new BadRequestException('Invalid phone number format');
    }

    const existingUser = await this.prisma.user.findFirst({
      where: { userInfo: { phoneNumber } },
    });
    if (existingUser) {
      throw new ConflictException('Phone number is already in use');
    }
  }

  private validateDateOfBirth(dateOfBirth: Date): boolean {
    const today = new Date();
    const age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - dateOfBirth.getMonth();
    const dayDiff = today.getDate() - dateOfBirth.getDate();

    if (
      age < 17 ||
      (age === 17 && monthDiff < 0) ||
      (age === 17 && monthDiff === 0 && dayDiff < 0)
    ) {
      throw new BadRequestException(
        'Invalid date of birth. User must be at least 17 years old.',
      );
    }

    return true;
  }

  private async validateUniversity(universityId: number): Promise<void> {
    const university = await this.prisma.university.findUnique({
      where: { id: universityId },
    });
    if (!university) {
      throw new BadRequestException('University not found');
    } else {
      return;
    }
  }

  private async validateFaculty(facultyId: number): Promise<void> {
    const faculty = await this.prisma.faculty.findUnique({
      where: { id: facultyId },
    });
    if (!faculty) {
      throw new BadRequestException('Faculty not found');
    } else {
      return;
    }
  }
}
