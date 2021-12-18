import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleType } from 'src/constants/role-type';
import { UserWithRoleResponse } from 'src/modules/user/dto/user-with-role.dto';
import { RoleRepository } from 'src/repositories/role.repository';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private roleRepository: RoleRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<RoleType[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const rolesByUser = await this.roleRepository.findAllWithUserRoleByUser(request.user);
    const userWithRole = new UserWithRoleResponse(request.user, rolesByUser);

    return this.matchRoles(roles, userWithRole);
  }

  matchRoles(roles: RoleType[], user: UserWithRoleResponse): boolean {
    let status = false;
    roles.map((role) => {
      if (role == RoleType.NON_REGISTERED) {
        status = status || user.roles.length == 0;
      } else if (role == RoleType.MEMBER) {
        status = status || user.roles.length != 0;
      } else if (role == RoleType.ADMIN) {
        status = status || user.isAdmin;
      }
    });
    return status;
  }
}
