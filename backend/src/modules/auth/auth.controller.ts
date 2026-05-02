import { Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginResponseDTO } from './dto/login.dto';
import { UserResponseDto } from '../user-management/dto/user-dto/user-dto';

type AuthenticatedRequest = {
  user: UserResponseDto;
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  login(@Request() req: AuthenticatedRequest) {
    const tokens = this.authService.generateTokens(req.user);

    return new LoginResponseDTO(
      req.user,
      tokens.accessToken,
      tokens.refreshToken,
    );
  }
}
