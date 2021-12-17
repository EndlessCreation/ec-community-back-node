import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import type { Response } from 'express';
import { STATUS_CODES } from 'http';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter<Prisma.PrismaClientKnownRequestError> {
  constructor(public reflector: Reflector) {}

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case 'P2002':
        const status = HttpStatus.CONFLICT;
        const message = exception.message.replace(/\n/g, '');
        response.status(status).json({
          statusCode: status,
          error: STATUS_CODES[status],
          message: message,
        });
        break;
      // TODO catch other error codes (e.g. 'P2000' or 'P2025')
    }
  }
}
