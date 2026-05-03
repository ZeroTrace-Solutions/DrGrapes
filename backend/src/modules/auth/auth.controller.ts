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
import { ResendOtpDto } from './dto/resend-otp.dto';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { RefreshDto } from './dto/refresh.dto';

type AuthenticatedRequest = {
  user: UserResponseDto;
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Request() req: AuthenticatedRequest) {
    const tokens = await this.authService.generateTokens(req.user);

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

  @Post('resend-otp')
  async resendOtp(@Body() dto: ResendOtpDto) {
    return this.authService.resendOtp(dto);
  }

  @Post('forget-password')
  async forgetPassword(@Body() dto: ForgetPasswordDto) {
    return this.authService.forgetPassword(dto);
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  // --- AUTHENTICATED ROUTES (Requires Valid JWT) ---

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(
    @Request() req: AuthenticatedRequest,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.authService.changePassword(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req: AuthenticatedRequest) {
    return this.authService.logout(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout-all')
  async logoutAll(@Request() req: AuthenticatedRequest) {
    return this.authService.logoutAll(req.user.id);
  }

  @Post('refresh')
  async refresh(@Body() dto: RefreshDto) {
    const { user, tokens } = await this.authService.refreshTokens(
      dto.refreshToken,
    );

    // Return the exact same standardized DTO as your login endpoint
    return new LoginResponseDTO(
      new UserResponseDto(user),
      tokens.accessToken,
      tokens.refreshToken,
    );
  }
}
