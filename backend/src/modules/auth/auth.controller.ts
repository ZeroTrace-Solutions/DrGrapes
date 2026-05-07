import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { Request as ExpressRequest, Response } from 'express';
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

export type AuthenticatedRequest = {
  user: UserResponseDto;
};

type RequestWithCookies = ExpressRequest & {
  cookies: Record<string, string | undefined>;
};

const refreshCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(
    @Request() req: AuthenticatedRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.generateTokens(req.user);

    res.cookie('refresh_token', tokens.refreshToken, refreshCookieOptions);

    return new LoginResponseDTO(req.user, tokens.accessToken);
  }

  @Post('signup')
  async signup(@Body() signupDto: SignUpStudentDto) {
    return await this.authService.studentSignup(signupDto);
  }

  @Post('verify-email')
  async verifyEmail(
    @Body() verifyDto: VerifySignupDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, accessToken, refreshToken } =
      await this.authService.verifyEmail(verifyDto);

    res.cookie('refresh_token', refreshToken, refreshCookieOptions);

    return new LoginResponseDTO(user, accessToken);
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
    return await this.authService.resendOtp(dto);
  }

  @Post('forget-password')
  async forgetPassword(@Body() dto: ForgetPasswordDto) {
    return await this.authService.forgetPassword(dto);
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return await this.authService.resetPassword(dto);
  }

  // --- AUTHENTICATED ROUTES (Requires Valid JWT) ---

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(
    @Request() req: AuthenticatedRequest,
    @Body() dto: ChangePasswordDto,
  ) {
    return await this.authService.changePassword(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(
    @Request() req: AuthenticatedRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.clearCookie('refresh_token', refreshCookieOptions);
    return await this.authService.logout(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout-all')
  async logoutAll(
    @Request() req: AuthenticatedRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.clearCookie('refresh_token', refreshCookieOptions);
    return await this.authService.logoutAll(req.user.id);
  }

  @Post('refresh')
  async refresh(
    @Req() req: RequestWithCookies,
    @Res({ passthrough: true }) res: Response,
  ) {
    const rawCookies: unknown = req.cookies;
    const refreshToken =
      rawCookies &&
      typeof rawCookies === 'object' &&
      'refresh_token' in rawCookies &&
      typeof (rawCookies as { refresh_token?: unknown }).refresh_token ===
        'string'
        ? (rawCookies as { refresh_token: string }).refresh_token
        : null;

    if (!refreshToken) {
      throw new UnauthorizedException('Missing refresh token cookie');
    }

    const { user, tokens } = await this.authService.refreshTokens(refreshToken);

    res.cookie('refresh_token', tokens.refreshToken, refreshCookieOptions);

    return new LoginResponseDTO(new UserResponseDto(user), tokens.accessToken);
  }

  @Get('universities')
  async getAllUniversityNames() {
    return await this.authService.getAllUniversityNames();
  }

  @Get('faculties')
  async getFacultiesByUniversity() {
    return await this.authService.getAllFaculty();
  }
}
