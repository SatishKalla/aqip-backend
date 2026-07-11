import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface ErrorResponseBody {
  error: {
    code: string;
    message: string;
    details?: unknown;
    path: string;
    timestamp: string;
  };
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status = this.getStatus(exception);

    response.status(status).json({
      error: {
        code: this.getErrorCode(status),
        message: this.getMessage(exception, status),
        details: this.getDetails(exception),
        path: request.url,
        timestamp: new Date().toISOString(),
      },
    } satisfies ErrorResponseBody);
  }

  private getStatus(exception: unknown): number {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }

    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private getErrorCode(status: number): string {
    return HttpStatus[status] ?? 'INTERNAL_SERVER_ERROR';
  }

  private getMessage(exception: unknown, status: number): string {
    if (!(exception instanceof HttpException)) {
      return 'Internal server error';
    }

    const response = exception.getResponse();

    if (typeof response === 'string') {
      return response;
    }

    if (this.hasMessage(response)) {
      return Array.isArray(response.message)
        ? 'Request validation failed'
        : response.message;
    }

    return this.getErrorCode(status);
  }

  private getDetails(exception: unknown): unknown {
    if (!(exception instanceof HttpException)) {
      return undefined;
    }

    const response = exception.getResponse();

    if (this.hasMessage(response) && Array.isArray(response.message)) {
      return response.message;
    }

    return undefined;
  }

  private hasMessage(
    response: unknown,
  ): response is { message: string | string[] } {
    return (
      typeof response === 'object' && response !== null && 'message' in response
    );
  }
}
