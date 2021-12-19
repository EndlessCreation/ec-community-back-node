import { ApiProperty } from '@nestjs/swagger';
import { Role, Skill, User } from '@prisma/client';
import { UserResponse } from './user-response.dto';

export class UserWithRoleAndSkillResponse extends UserResponse {
  @ApiProperty()
  skills: Array<string>;

  @ApiProperty()
  roles: Array<string>;

  @ApiProperty()
  isAdmin: boolean;

  @ApiProperty()
  isLeader: boolean;
  constructor(user: User, skills: Array<Skill>, roles: Array<Role>) {
    super(user);
    this.skills = skills.map((skill) => skill.name);
    this.roles = roles.map((role) => role.name);
    this.isAdmin = roles.length ? roles.map((role) => role.isAdmin).reduce((accumulator, currentValue) => accumulator || currentValue) : false;
    this.isLeader = roles.length ? roles.map((role) => role.isLeader).reduce((accumulator, currentValue) => accumulator || currentValue) : false;
  }
}
