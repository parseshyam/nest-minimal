import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    async catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const error = exception.getResponse(); 
        let defaultError = "Something went wrong";
        // @ts-ignore
        defaultError = typeof error === "object" && error?.message ? error.message : error
        response.status(status).json({
            statusCode: status,
            statusMessage: defaultError,
            path: request.url
        });
    }
}
