import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

interface Response<T> {
  success: boolean;
  data: T | null;
  statusCode: number;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  Response<T>
> {
  intercept(
    context: ExecutionContext,
    call$: CallHandler<T>,
  ): Observable<Response<T>> {
    const response = context
      .switchToHttp()
      .getResponse<{ statusCode: number }>();

    return call$.handle().pipe(
      map((data) => ({
        success: true,
        data: data != undefined ? data : null,
        statusCode: response.statusCode,
      })),
    );
  }
}
