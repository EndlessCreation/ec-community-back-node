import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { StatusResponse } from 'src/common/dto/status-response.dto';
import { RoleType } from 'src/constants/role-type';
import { Auth } from 'src/decorators/auth.decorators';
import { User } from 'src/decorators/user.decorators';
import { UserResponse } from '../user/dto/user-response.dto';
import { SkillListRequest } from './dto/skill-list-request.dto';
import { SkillManageRequest } from './dto/skill-manage-request.dto';
import { SkillRequest } from './dto/skill-request.dto';
import { SkillResponse } from './dto/skill-response.dto';
import { SkillService } from './skill.service';

@Controller('skill')
@ApiTags('Skill')
export class SkillController {
  constructor(private skillService: SkillService) {}

  @Post('')
  @Auth([RoleType.MEMBER])
  @ApiResponse({
    status: HttpStatus.OK,
    description: '역할 추가',
    type: SkillResponse,
  })
  async create(@Body() data: SkillRequest): Promise<SkillResponse> {
    return this.skillService.create(data);
  }

  @Get('')
  @ApiResponse({
    status: HttpStatus.OK,
    description: '역할 검색',
    type: SkillResponse,
    isArray: true,
  })
  async getList(@Query(new ValidationPipe({ transform: true })) data: SkillListRequest): Promise<SkillResponse[]> {
    return this.skillService.getList(data);
  }

  @Patch('manage')
  @Auth([RoleType.MEMBER])
  @ApiResponse({
    status: HttpStatus.OK,
    description: '본인 역할 관리',
    type: StatusResponse,
  })
  async update(@User() user: UserResponse, @Body() data: SkillManageRequest): Promise<StatusResponse> {
    return this.skillService.update(user.id, data);
  }

  @Patch('manage/:id')
  @Auth([RoleType.ADMIN])
  @ApiResponse({
    status: HttpStatus.OK,
    description: '어드민)타인 역할 관리',
    type: StatusResponse,
  })
  async updateOther(@Param('id') userId: number, @Body() data: SkillManageRequest): Promise<StatusResponse> {
    return this.skillService.update(userId, data);
  }
}
