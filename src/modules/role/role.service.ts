import { BadRequestException, Injectable } from '@nestjs/common';
import { StatusResponse } from 'src/common/dto/status-response.dto';
import { RoleRepository } from 'src/repositories/role.repository';
import { UserRoleRepository } from 'src/repositories/user-role.repository';
import { RoleListResponse } from './dto/role-list-response.dto';
import { RoleRequest } from './dto/role-request.dto';
import { RoleResponse } from './dto/role-response.dto';

@Injectable()
export class RoleService {
  constructor(private roleRepository: RoleRepository, private userRoleRepository: UserRoleRepository) {}

  async create(data: RoleRequest): Promise<RoleResponse> {
    const role = await this.roleRepository.create(data);
    return new RoleResponse(role);
  }

  async getList(): Promise<RoleListResponse> {
    const roles = await this.roleRepository.findAll();
    return new RoleListResponse(roles);
  }

  async edit(roleId: number, data: RoleRequest): Promise<RoleResponse> {
    const updatedRole = await this.roleRepository.updateByUnique({ id: roleId }, data);
    return new RoleResponse(updatedRole);
  }

  async delete(roleId: number): Promise<StatusResponse> {
    const rolesByUser = await this.userRoleRepository.findLimitOne({ roleId });
    if (rolesByUser.length) {
      throw new BadRequestException('역할을 갖고 있는 유저가 있어요.');
    }

    await this.roleRepository.deleteByUnique({ id: roleId });
    return new StatusResponse(true);
  }
}
