import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class RoleResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  isAdmin?: boolean;

  @ApiPropertyOptional()
  isLeader?: boolean;

  constructor(role: Role) {
    this.id = role.id;
    this.name = role.name;
    this.isAdmin = role.isAdmin;
    this.isLeader = role.isLeader;
  }
}
