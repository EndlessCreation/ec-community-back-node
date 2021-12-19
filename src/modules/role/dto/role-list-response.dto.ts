import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class RoleListResponse {
  @ApiProperty()
  roleList: Array<Role>;

  constructor(roles: Array<Role>) {
    this.roleList = roles;
  }
}
