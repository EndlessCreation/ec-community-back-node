import { ApiPropertyOptional } from '@nestjs/swagger';
import { StatusType } from 'src/constants/status-type';
import { TokenResponse } from './token-response.dto';

export class AuthResponse extends TokenResponse {
  @ApiPropertyOptional()
  status: StatusType;

  constructor(data: { expiresIn: number; accessToken: string }, status: StatusType) {
    super(data);
    this.status = status;
  }
}
