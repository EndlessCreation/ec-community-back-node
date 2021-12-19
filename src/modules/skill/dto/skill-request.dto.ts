import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SkillRequest {
  @ApiProperty()
  @IsString()
  name: string;
}
