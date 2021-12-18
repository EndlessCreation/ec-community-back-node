import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { StatusResponse } from 'src/common/dto/status-response.dto';
import { RoleType } from 'src/constants/role-type';
import { Auth } from 'src/decorators/auth.decorators';
import { RoleListResponse } from './dto/role-list-response.dto';
import { RoleRequest } from './dto/role-request.dto';
import { RoleResponse } from './dto/role-response.dto';
import { RoleService } from './role.service';

@Controller('role')
@ApiTags('Role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post('')
  @Auth([RoleType.ADMIN])
  @ApiResponse({
    status: HttpStatus.OK,
    description: '역할 추가',
    type: RoleResponse,
  })
  async create(@Body() data: RoleRequest): Promise<RoleResponse> {
    return this.roleService.create(data);
  }

  @Get('')
  @Auth([RoleType.ADMIN])
  @ApiResponse({
    status: HttpStatus.OK,
    description: '역할 리스트',
    type: RoleListResponse,
  })
  async getList(): Promise<RoleListResponse> {
    return this.roleService.getList();
  }

  @Patch(':id')
  @Auth([RoleType.ADMIN])
  @ApiResponse({
    status: HttpStatus.OK,
    description: '역할 수정',
    type: RoleResponse,
  })
  async edit(@Param('id') roleId: number, @Body() data: RoleRequest): Promise<RoleResponse> {
    return this.roleService.edit(roleId, data);
  }

  @Delete(':id')
  @Auth([RoleType.ADMIN])
  @ApiResponse({
    status: HttpStatus.OK,
    description: '역할 삭제\n해당 역할을 갖고 있는 경우 삭제되지 않아요.',
    type: StatusResponse,
  })
  async delete(@Param('id') roleId: number): Promise<StatusResponse> {
    return this.roleService.delete(roleId);
  }
}
