import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserManagementModule } from './modules/user-management/user-management.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';
import { HealthModule } from './modules/health/health.module';
import { MailModule } from './common/mail/mail.module';

@Module({
  imports: [UserManagementModule, AuthModule, DatabaseModule, HealthModule, MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
