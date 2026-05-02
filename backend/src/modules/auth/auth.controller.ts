import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginResponseDTO } from './dto/login.dto';
import { UserResponseDto } from '../user-management/dto/user-dto/user-dto';
import { SignUpStudentDto } from './dto/signup.dto';
import { VerifySignupDto } from './dto/verify-signup.dto';

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

  @Post('signup')
  async signup(@Body() signupDto: SignUpStudentDto) {
    return await this.authService.studentSignup(signupDto);
  }

  @Post('verify-email')
  async verifyEmail(@Body() verifyDto: VerifySignupDto) {
    const { user, accessToken, refreshToken } =
      await this.authService.verifyEmail(verifyDto);
    return new LoginResponseDTO(user, accessToken, refreshToken);
  }

  @Get('check-username/:username')
  async checkUsernameAvailability(@Param('username') username: string) {
    const isAvailable =
      await this.authService.checkUsernameAvailability(username);
    return { isAvailable };
  }

  @Get('suggest-usernames/:fullName/:email')
  async suggestUsernames(
    @Param('fullName') fullName: string,
    @Param('email') email: string,
  ) {
    const usernames: string[] = await this.authService.generateUsername(
      fullName,
      email,
    );
    return { usernames };
  }
}
