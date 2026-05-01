import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { UserResponseDto } from 'src/modules/user-management/dto/user-dto/user-dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'identifier' });
  }

  async validate(
    identifier: string,
    password: string,
  ): Promise<UserResponseDto> {
    const user: UserResponseDto = await this.authService.validateUser({
      identifier,
      password,
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user;
  }
}
