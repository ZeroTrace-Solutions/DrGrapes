import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let messages: string[] = ['Internal server error'];

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse() as Record<
        string,
        unknown
      >;

      messages = Array.isArray(exceptionResponse?.message)
        ? (exceptionResponse.message as string[])
        : [(exceptionResponse?.message as string) || exception.message];
    } else if (exception instanceof Error) {
      messages = [exception.message];
    }

    response.status(status).json({
      success: false,
      message: messages,
    });
  }
}
