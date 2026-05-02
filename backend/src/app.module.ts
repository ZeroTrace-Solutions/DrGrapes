import { DynamicModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserManagementModule } from './modules/user-management/user-management.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';
import { HealthModule } from './modules/health/health.module';
import { MailModule } from './common/mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';

const TypedMailerModule = MailerModule as unknown as {
  forRoot: (options: {
    transport: {
      host: string;
      port: number;
      secure: boolean;
      auth: {
        user?: string;
        pass?: string;
      };
      tls: {
        rejectUnauthorized: boolean;
      };
    };
  }) => DynamicModule;
};

const mailPort = Number(process.env.MAIL_PORT) || 587;

@Module({
  imports: [
    UserManagementModule,
    AuthModule,
    DatabaseModule,
    HealthModule,
    MailModule,
    TypedMailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST || 'smtp.your-host.com',
        port: mailPort,
        secure: mailPort === 465, // true for 465
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
