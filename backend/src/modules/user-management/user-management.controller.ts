import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/auth.controller';
import { UserManagementService } from './user-management.service';

@Controller('user')
export class UserManagementController {
  constructor(private readonly userManagementService: UserManagementService) {}
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req: AuthenticatedRequest) {
    return await this.userManagementService.getUserProfile(req.user.id);
  }
}
