import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class RoleManageRequest {
  @ApiProperty()
  @IsArray()
  roleList: Array<number>;
}
