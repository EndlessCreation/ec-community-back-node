import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AxiosError } from 'axios';
import { Response } from 'express';
import { STATUS_CODES } from 'http';

export class AxiosErrorClass implements AxiosError {
  config: import('axios').AxiosRequestConfig;
  code?: string;
  request?: any;
  response?: import('axios').AxiosResponse<any>;
  isAxiosError: boolean;
  toJSON: () => object;
  name: string;
  message: string;
  stack?: string;
}
@Catch(AxiosErrorClass)
export class AxiosExceptionFilter implements ExceptionFilter<AxiosErrorClass> {
  constructor(public reflector: Reflector) {}

  catch(exception: AxiosError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const errorMessage = exception.response?.data?.message ?? exception.response?.data ?? exception.message;

    const status = exception.code == 'ENOTFOUND' ? HttpStatus.BAD_GATEWAY : HttpStatus.NOT_FOUND;

    response.status(status).json({
      statusCode: status,
      error: STATUS_CODES[status],
      message: errorMessage,
    });
  }
}
