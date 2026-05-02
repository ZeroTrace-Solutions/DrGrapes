import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { UserManagementService } from '../user-management/user-management.service';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from '../user-management/dto/user-dto/user-dto';
import { MailService } from 'src/common/mail/mail.service';
import { DatabaseService } from '../database/database.service';
import { generateOTP } from 'src/common/utils/otp.util';
import * as bcrypt from 'bcrypt';
import { Purpose } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userManagementService: UserManagementService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly prisma: DatabaseService,
  ) {}

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
