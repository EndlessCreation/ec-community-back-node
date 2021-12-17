import { ApiPropertyOptional } from '@nestjs/swagger';
import { TokenDto } from './token.dto';

export class AuthResponse extends TokenDto {
  @ApiPropertyOptional()
  isNew?: boolean;

  constructor(data: { expiresIn: number; accessToken: string }, isNew?: boolean) {
    super(data);
    this.isNew = isNew;
  }
}
