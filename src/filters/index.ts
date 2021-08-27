import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { I18n } from 'i18n';
export const i18n = new I18n();

i18n.configure({
  locales: ['en', 'de'],
  defaultLocale: 'en',
  autoReload: true,
  directory: 'src/locales',
});

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.getResponse();
    i18n.setLocale(i18n.getLocale(request));
    const errorCode =
      // @ts-ignore
      typeof error === 'object' && error?.message ? error.message : error;
    response.status(status).json({
      statusCode: status,
      statusMessage: i18n.__(errorCode) || 'Something went wrong',
      path: request.url,
    });
  }
}
