import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class SkillManageRequest {
  @ApiProperty()
  @IsArray()
  skillList: Array<number>;
}
