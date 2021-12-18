import { ApiProperty } from '@nestjs/swagger';
import { Role, User } from '@prisma/client';
import { UserResponse } from './user-response.dto';

export class UserWithRoleResponse extends UserResponse {
  @ApiProperty()
  roles?: Array<string>;

  @ApiProperty()
  isAdmin: boolean;

  @ApiProperty()
  isLeader: boolean;
  constructor(user: User, roles: Array<Role>) {
    super(user);
    this.roles = roles.map((role) => role.name);
    this.isAdmin = roles.length ? roles.map((role) => role.isAdmin).reduce((accumulator, currentValue) => accumulator || currentValue) : false;
    this.isLeader = roles.length ? roles.map((role) => role.isLeader).reduce((accumulator, currentValue) => accumulator || currentValue) : false;
  }
}
