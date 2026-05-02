import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { UserManagementService } from '../user-management/user-management.service';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from '../user-management/dto/user-dto/user-dto';
import { MailService } from '../../common/mail/mail.service';
import { DatabaseService } from '../database/database.service';
import { generateOTP } from '../../common/utils/otp.util';
import * as bcrypt from 'bcrypt';
import { Otp, Purpose } from '@prisma/client';
import { SignUpStudentDto } from './dto/signup.dto';
import { VerifySignupDto } from './dto/verify-signup.dto';
import { randomInt } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly userManagementService: UserManagementService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async checkUsernameAvailability(username: string): Promise<boolean> {
    const user = await this.userManagementService.findUserByUsername(username);
    if (user) {
      throw new BadRequestException('Username is already taken');
    }
    return true;
  }

  async generateUsername(fullName: string, email: string): Promise<string[]> {
    // 1. Sanitize and split the name
    const nameParts = fullName.toLowerCase().trim().split(/\s+/);
    const firstName = nameParts[0]?.replace(/[^a-z0-9]/g, '') || '';
    const lastName =
      nameParts[nameParts.length - 1]?.replace(/[^a-z0-9]/g, '') || '';
    const lastInitial = lastName?.charAt(0) || '';
    const firstInitial = firstName?.charAt(0) || '';

    // 2. Extract email prefix (everything before @)
    const emailPrefix =
      email
        .split('@')[0]
        ?.toLowerCase()
        .replace(/[^a-z0-9]/g, '') || '';

    // 3. Build a diverse pool of candidate usernames (max ~20)
    const candidates: string[] = [];

    // Helper to add a candidate if it’s not empty and not already in the list
    const addCandidate = (name: string) => {
      if (name && !candidates.includes(name)) {
        candidates.push(name);
      }
    };

    // Basic variants
    addCandidate(firstName); // "john"
    addCandidate(firstName + lastInitial); // "johns"
    addCandidate(firstInitial + lastName); // "jsmith"
    addCandidate(emailPrefix); // "johnsmith" if email was john.smith@...
    addCandidate(firstName + lastName); // "johnsmith"

    // Adding first name + under score + last initial
    if (firstInitial && lastName) {
      addCandidate(firstName + '_' + lastInitial); // "john_s"
    }

    // Name with random 2‑digit suffix (for variety)
    for (let i = 0; i < 3; i++) {
      const suffix = randomInt(10, 99).toString();
      addCandidate(firstName + suffix); // "john42"
    }

    // Email prefix with random suffix
    for (let i = 0; i < 2; i++) {
      const suffix = randomInt(100, 999).toString();
      addCandidate(emailPrefix + suffix); // "johnsmith372"
    }

    // Fallback: first name + under score + random
    for (let i = 0; i < 2; i++) {
      const suffix = randomInt(1000, 9999).toString();
      addCandidate(firstName + '_' + suffix); // "john_5821"
    }

    // If name parts are extremely short or missing, add some generic ones
    if (candidates.length < 5) {
      const fallbacks = ['user', 'member', 'hello', 'welcome'];
      fallbacks.forEach((word) => addCandidate(word + randomInt(10, 99)));
    }

    // 4. Check all candidates against the database in one query
    const existingUsers = await this.prisma.user.findMany({
      where: {
        username: {
          in: candidates,
        },
      },
      select: { username: true },
    });
    const takenUsernames = new Set(existingUsers.map((u) => u.username));

    // 5. Filter and return the first 4 available
    return candidates.filter((c) => !takenUsernames.has(c)).slice(0, 4);
  }

  async studentSignup(
    signupDto: SignUpStudentDto,
  ): Promise<{ message: string }> {
    await this.userManagementService.createStudent(signupDto);

    await this.generateAndSendOTP(signupDto.email, Purpose.SIGNUP);

    return { message: 'Signup successful. Please verify your email.' };
  }

  async verifyEmail(verifyDto: VerifySignupDto) {
    const { email, code } = verifyDto;
    const otpRecord: Otp | null = await this.prisma.otp.findFirst({
      where: { email, purpose: Purpose.SIGNUP },
    });

    if (!otpRecord) {
      throw new BadRequestException('No OTP found for this email');
    }

    if (otpRecord.expiresAt < new Date()) {
      await this.prisma.otp.delete({ where: { id: otpRecord.id } });
      throw new BadRequestException(
        'OTP has expired. Please request a new one.',
      );
    }

    const isCodeValid = await bcrypt.compare(code, otpRecord.code);

    if (!isCodeValid) {
      throw new BadRequestException('Invalid OTP code');
    }

    await this.userManagementService.markEmailAsVerified(email);
    await this.prisma.otp.delete({ where: { id: otpRecord.id } });

    const user = await this.userManagementService.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException('User not found for this email');
    }

    const tokens = this.generateTokens(new UserResponseDto(user));

    await this.mailService.sendWelcomeEmail(email, user.full_name);

    return {
      message: 'Email verified successfully',
      user: new UserResponseDto(user),
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async validateUser(dto: LoginDTO): Promise<UserResponseDto> {
    if (!dto.identifier) {
      throw new BadRequestException(
        'Either email or username must be provided',
      );
    }

    if (!dto.password) {
      throw new BadRequestException('Password must be provided');
    }

    if (
      dto.identifier.includes('@') &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dto.identifier)
    ) {
      throw new BadRequestException('Invalid email format');
    }
    const user = dto.identifier.includes('@')
      ? await this.userManagementService.findUserByEmail(dto.identifier)
      : await this.userManagementService.findUserByUsername(dto.identifier);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isEmailVerified)
      throw new UnauthorizedException('Please verify your email first.');

    const isPasswordValid = await this.userManagementService.validatePassword(
      dto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return new UserResponseDto(user);
  }

  generateTokens(user: UserResponseDto): {
    accessToken: string;
    refreshToken: string;
  } {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      username: user.username,
      level: String(user.level),
    };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m', // Short-lived access token
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
        expiresIn: '7d', // Long-lived refresh token
      }),
    };
  }

  async generateAndSendOTP(email: string, purpose: Purpose): Promise<boolean> {
    const rowOTP = generateOTP();
    const hashedOTP = await bcrypt.hash(rowOTP, 10);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

    await this.prisma.otp.deleteMany({ where: { email, purpose } });
    await this.prisma.otp.create({
      data: { email, code: hashedOTP, purpose, expiresAt },
    });

    await this.mailService.sendOtpEmail(email, rowOTP, purpose);

    return true;
  }
}
