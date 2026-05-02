import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { existsSync, readFileSync } from 'fs';
import { join, resolve } from 'path';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailService.name);
  private readonly templateDirectories = [
    resolve(process.cwd(), 'email-templates'),
    resolve(process.cwd(), '..', 'email-templates'),
  ];

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT ?? '587', 10),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendOtpEmail(
    to: string,
    otp: string,
    purpose: string,
  ): Promise<boolean> {
    let subject: string = 'Your Dr. Grapes Verification Code';
    let text: string = `Your OTP for ${purpose} is: ${otp}`;
    let templateName = 'verify-email.html';

    if (purpose === 'SIGNUP') {
      subject = 'Welcome to DrGrapes - Verify your email';
      text = `Your registration OTP is: ${otp}`;
      templateName = 'verify-email.html';
    } else if (purpose === 'FORGET_PASSWORD') {
      subject = 'DrGrapes - Password Reset Request';
      text = `We received a request to reset your password. Your reset code is: ${otp}. If you did not request this, please ignore this email.`;
      templateName = 'reset-password.html';
    }

    try {
      const html = this.renderTemplate(templateName, {
        otp,
      });

      await this.transporter.sendMail({
        from: `"DrGrapes Support" <${process.env.SMTP_USER}>`,
        to,
        subject,
        text,
        html,
      });
      this.logger.log(`OTP email sent to ${to} for ${purpose}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}:`, error);
      return false;
    }
  }

  async sendWelcomeEmail(to: string, fullName: string): Promise<boolean> {
    const subject = 'Welcome to DrGrapes!';
    const text = `Hi ${fullName},\n\nWelcome to DrGrapes! We're excited to have you on board. If you have any questions or need assistance, feel free to reach out to our support team.\n\nBest regards,\nThe DrGrapes Team`;

    const firstName = fullName.split(' ')[0] || fullName;

    try {
      const html = this.renderTemplate('welcome.html', {
        firstName,
        actionUrl: this.getBaseUrl(),
      });

      await this.transporter.sendMail({
        from: `"DrGrapes Support" <${process.env.SMTP_USER}>`,
        to,
        subject,
        text,
        html,
      });
      this.logger.log(`Welcome email sent to ${to}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to send welcome email to ${to}:`, error);
      return false;
    }
  }

  private renderTemplate(
    templateName: string,
    values: Record<string, string>,
  ): string {
    const template = this.loadTemplate(templateName);
    const commonValues = this.getCommonTemplateValues();
    const placeholders: Record<string, string> = {
      ...commonValues,
      ...values,
    };

    return template.replace(/\{\{(\w+)\}\}/g, (_match, key: string) => {
      return placeholders[key] ?? '';
    });
  }

  private loadTemplate(templateName: string): string {
    for (const dir of this.templateDirectories) {
      const filePath = join(dir, templateName);
      if (existsSync(filePath)) {
        return readFileSync(filePath, 'utf8');
      }
    }

    throw new Error(`Email template not found: ${templateName}`);
  }

  private getCommonTemplateValues(): Record<string, string> {
    const baseUrl = this.getBaseUrl();

    return {
      year: String(new Date().getFullYear()),
      baseUrl,
      supportUrl: process.env.SUPPORT_URL ?? `${baseUrl}/support`,
      privacyUrl: process.env.PRIVACY_URL ?? `${baseUrl}/privacy`,
      termsUrl: process.env.TERMS_URL ?? `${baseUrl}/terms`,
      unsubscribeUrl: process.env.UNSUBSCRIBE_URL ?? `${baseUrl}/unsubscribe`,
      addressUrl: process.env.ADDRESS_URL ?? `${baseUrl}/address`,
      notificationsUrl:
        process.env.NOTIFICATIONS_URL ?? `${baseUrl}/notifications`,
    };
  }

  private getBaseUrl(): string {
    return process.env.FRONTEND_URL ?? 'https://dr-grapes.ztsolutions.tech';
  }
}
