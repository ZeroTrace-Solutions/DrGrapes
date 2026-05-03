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
import { Otp, Purpose, User } from '@prisma/client';
import { SignUpStudentDto } from './dto/signup.dto';
import { VerifySignupDto } from './dto/verify-signup.dto';
import { randomInt } from 'crypto';
import { ResendOtpDto } from './dto/resend-otp.dto';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtPayload } from './strategies/jwt.strategy';

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

    const user: User | null =
      await this.userManagementService.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException('User not found for this email');
    }

    const tokens = await this.generateTokens(new UserResponseDto(user));

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

  async generateTokens(user: UserResponseDto): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      username: user.username,
      level: String(user.level),
      tokenVersion: user.tokenVersion,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m', // Short-lived access token
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
      expiresIn: '7d', // Long-lived refresh token
    });

    const hashedRt = await bcrypt.hash(refreshToken, 10);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { hashedRefreshToken: hashedRt },
    });

    return {
      accessToken,
      refreshToken,
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

  async resendOtp(dto: ResendOtpDto) {
    if (!dto.email) {
      throw new BadRequestException('Email must be provided');
    }

    const user: User | null = await this.userManagementService.findUserByEmail(
      dto.email,
    );

    if (!user) return { message: 'If the email exists, an OTP will be sent.' };

    if (dto.purpose === Purpose.SIGNUP && user.isEmailVerified) {
      throw new BadRequestException('Email is already verified.');
    }

    const lastOTP = await this.prisma.otp.findFirst({
      where: { email: dto.email, purpose: dto.purpose },
      orderBy: { createdAt: 'desc' },
    });

    if (lastOTP && lastOTP.createdAt > new Date(Date.now() - 2 * 60 * 1000)) {
      throw new BadRequestException(
        'Please wait at least 2 minutes before requesting a new OTP.',
      );
    }

    await this.generateAndSendOTP(dto.email, dto.purpose);
    return { message: 'A new OTP has been sent.' };
  }

  async forgetPassword(dto: ForgetPasswordDto) {
    const user: User | null = await this.userManagementService.findUserByEmail(
      dto.email,
    );
    if (user) {
      await this.generateAndSendOTP(dto.email, Purpose.FORGET_PASSWORD);
    }
    return { message: 'If the email exists, a reset code has been sent.' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const otpRecord = await this.prisma.otp.findFirst({
      where: { email: dto.email, purpose: Purpose.FORGET_PASSWORD },
    });

    if (
      !otpRecord ||
      otpRecord.expiresAt < new Date() ||
      !(await bcrypt.compare(dto.code, otpRecord.code))
    ) {
      if (otpRecord && otpRecord.expiresAt < new Date()) {
        await this.prisma.otp.delete({ where: { id: otpRecord.id } });
      }
      throw new BadRequestException('Invalid or expired OTP.');
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);

    // Update password, increment tokenVersion (logs out all old devices), and clear OTP
    const user = await this.prisma.user.update({
      where: { email: dto.email },
      data: {
        password: hashedPassword,
        tokenVersion: { increment: 1 },
        hashedRefreshToken: null,
      },
    });
    await this.prisma.otp.delete({ where: { id: otpRecord.id } });

    await this.mailService.sendPasswordChangeNotification(
      user.email,
      user.full_name,
    );

    return { message: 'Password has been successfully reset. Please log in.' };
  }

  async changePassword(userId: number, dto: ChangePasswordDto) {
    const user: User | null = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new BadRequestException('User not found.');
    }

    if (!(await bcrypt.compare(dto.oldPassword, user.password))) {
      throw new BadRequestException('Incorrect old password.');
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    await this.mailService.sendPasswordChangeNotification(
      user.email,
      user.full_name,
    );

    return { message: 'Password updated successfully.' };
  }

  async logout(userId: number) {
    // Clear the refresh token to end the current session
    await this.prisma.user.update({
      where: { id: userId },
      data: { hashedRefreshToken: null },
    });
    return { message: 'Logged out successfully.' };
  }

  async logoutAll(userId: number) {
    // Increment tokenVersion to kill all active access tokens instantly
    await this.prisma.user.update({
      where: { id: userId },
      data: { hashedRefreshToken: null, tokenVersion: { increment: 1 } },
    });
    return { message: 'Logged out from all devices.' };
  }

  async refreshTokens(refreshToken: string) {
    try {
      const payload: JwtPayload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
      });

      const userId = payload.sub;

      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user || !user.hashedRefreshToken) {
        throw new UnauthorizedException('Access denied');
      }

      const isRefreshTokenValid = await bcrypt.compare(
        refreshToken,
        user.hashedRefreshToken,
      );

      if (!isRefreshTokenValid) {
        throw new UnauthorizedException('Access denied');
      }

      const tokens = await this.generateTokens(new UserResponseDto(user));

      return { user, tokens };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException(
        'Invalid or expired refresh token. Please log in again.',
      );
    }
  }
}
