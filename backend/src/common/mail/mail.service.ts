import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailService.name);

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

    if (purpose === 'SIGNUP') {
      subject = 'Welcome to DrGrapes - Verify your email';
      text = `Your registration OTP is: ${otp}`;
    } else if (purpose === 'FORGET_PASSWORD') {
      subject = 'DrGrapes - Password Reset Request';
      text = `We received a request to reset your password. Your reset code is: ${otp}. If you did not request this, please ignore this email.`;
    }

    try {
      await this.transporter.sendMail({
        from: `"DrGrapes Support" <${process.env.SMTP_USER}>`,
        to,
        subject,
        text,
      });
      this.logger.log(`OTP email sent to ${to} for ${purpose}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}:`, error);
      return false;
    }
  }
}
