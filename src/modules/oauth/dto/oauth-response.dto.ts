import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class OauthResponse {
  @ApiProperty()
  @IsEmail()
  email: string;
}
