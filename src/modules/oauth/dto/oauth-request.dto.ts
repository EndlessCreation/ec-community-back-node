import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class OauthRequest {
  @ApiProperty()
  @IsString()
  accessToken: string;
}
