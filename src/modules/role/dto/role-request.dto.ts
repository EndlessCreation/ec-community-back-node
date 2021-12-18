import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class RoleRequest {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsBoolean()
  isAdmin: boolean;

  @ApiProperty()
  @IsBoolean()
  isLeader: boolean;
}
