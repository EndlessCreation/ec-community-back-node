import { Body, Controller, Get, HttpStatus, Param, Patch, Query, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleType } from 'src/constants/role-type';
import { Auth } from 'src/decorators/auth.decorators';
import { User } from 'src/decorators/user.decorators';
import { UserResponse } from '../user/dto/user-response.dto';
import { UserListRequest } from './dto/user-list-request.dto';
import { UserUpdateRequest } from './dto/user-update-request.dto';
import { UserWithRoleAndSkillResponse } from './dto/user-with-role-and-skill.dto';
import { UserWithRoleResponse } from './dto/user-with-role.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  @Auth([RoleType.MEMBER])
  @ApiResponse({
    status: HttpStatus.OK,
    description: '본인 정보 확인',
    type: UserResponse,
  })
  async get(@User() user: UserResponse): Promise<UserWithRoleAndSkillResponse> {
    return this.userService.findByUserId(user.id);
  }

  @Get('/list')
  @ApiResponse({
    status: HttpStatus.OK,
    description: '유저 리스트',
    type: UserResponse,
    isArray: true,
  })
  async getList(@Query(new ValidationPipe({ transform: true })) userListRequest: UserListRequest): Promise<UserWithRoleAndSkillResponse[]> {
    return this.userService.findAll(userListRequest);
  }

  @Get(':id')
  @Auth([RoleType.MEMBER])
  @ApiResponse({
    status: HttpStatus.OK,
    description: '특정 유저 정보 확인',
    type: UserResponse,
  })
  async getOther(@Param('id') userId: number): Promise<UserWithRoleResponse> {
    return this.userService.findByUserId(userId);
  }

  @Patch('')
  @Auth([RoleType.MEMBER])
  @ApiResponse({
    status: HttpStatus.OK,
    description: '유저 정보 수정',
    type: UserResponse,
  })
  async update(@User() user: UserResponse, @Body() data: UserUpdateRequest): Promise<UserResponse> {
    return this.userService.updateProfile(user.id, data);
  }

  @Patch(':id')
  @Auth([RoleType.ADMIN])
  @ApiResponse({
    status: HttpStatus.OK,
    description: '특정 유저 정보 수정',
    type: UserResponse,
  })
  async updateOther(@Param('id') userId: number, @Body() data: UserUpdateRequest): Promise<UserResponse> {
    return this.userService.updateProfile(userId, data);
  }
}
