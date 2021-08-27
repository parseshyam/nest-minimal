import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    const methodKey = ctx.getHandler().name; // "create"
    const className = ctx.getClass().name; // "CatsController"
    console.log(methodKey, className)
    const now = Date.now();
    return next
      .handle()
      .pipe(tap((data) => console.log(`After... ${Date.now() - now}ms`, data)));
  }
}
