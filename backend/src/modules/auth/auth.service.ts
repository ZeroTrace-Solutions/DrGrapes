import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDTO } from './dto/login/login.dto';
import { UserManagementService } from '../user-management/user-management.service';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from '../user-management/dto/user-dto/user-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userManagementService: UserManagementService,
    private readonly jwtService: JwtService,
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
}
