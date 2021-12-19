import { Injectable } from '@nestjs/common';
import { Role, Skill } from '@prisma/client';
import { UserRepository } from 'src/repositories/user.repository';
import { UserListRequest } from './dto/user-list-request.dto';
import { UserResponse } from './dto/user-response.dto';
import { UserUpdateRequest } from './dto/user-update-request.dto';
import { UserWithRoleAndSkillResponse } from './dto/user-with-role-and-skill.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async updateProfile(userId: number, updateUserRequest: UserUpdateRequest): Promise<UserResponse> {
    return this.userRepository.updateByUnique({ id: userId }, updateUserRequest);
  }

  async findByUserId(userId: number): Promise<UserWithRoleAndSkillResponse> {
    const user = await this.userRepository.findWithRolesAndSkills({ id: userId });
    const roles: Array<Role> = user.UserRole.map((data) => data.Role);
    const skills: Array<Skill> = user.UserSkill.map((data) => data.Skill);

    return new UserWithRoleAndSkillResponse(user, skills, roles);
  }

  async findAll(userListRequest: UserListRequest): Promise<UserWithRoleAndSkillResponse[]> {
    const { isActive, role, skill, page, size, orderBy, sort } = userListRequest;

    const pagination = { skip: size * (page - 1), take: size };
    const orderOption = {};
    if (orderBy != null && sort != null) {
      orderOption[orderBy] = sort;
    }

    const whereOption = [];
    if (isActive != null) {
      whereOption.push({ isActive });
    }

    if (role != null) {
      whereOption.push({ UserRole: { some: { Role: { name: { in: role.split(',') } } } } });
    }

    if (skill != null) {
      whereOption.push({ UserSkill: { some: { Skill: { name: { in: skill.split(',') } } } } });
    }

    const userList = await this.userRepository.findAllByWhereOptionOrderByOrderOption(pagination, whereOption, orderOption);
    const userListResponse: UserWithRoleAndSkillResponse[] = [];
    userList.map((user) => {
      const roles: Array<Role> = user.UserRole.map((data) => data.Role);
      const skills: Array<Skill> = user.UserSkill.map((data) => data.Skill);
      userListResponse.push(new UserWithRoleAndSkillResponse(user, skills, roles));
    });

    return userListResponse;
  }
}
