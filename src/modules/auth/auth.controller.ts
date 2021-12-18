import { Body, Controller, Delete, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { StatusResponse } from 'src/common/dto/status-response.dto';
import { RoleType } from 'src/constants/role-type';
import { Auth } from 'src/decorators/auth.decorators';
import { User } from 'src/decorators/user.decorators';
import { UserResponse } from '../user/dto/user-response.dto';
import { UserUpdateRequest } from '../user/dto/user-update-request.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('')
  @Auth([RoleType.NON_REGISTERED])
  @ApiResponse({
    status: HttpStatus.OK,
    description: '유저 가입 신청',
    type: UserResponse,
  })
  async join(@User() user: UserResponse, @Body() data: UserUpdateRequest): Promise<UserResponse> {
    return this.authService.join(user, data);
  }

  @Delete('')
  @Auth([RoleType.MEMBER])
  @ApiResponse({
    status: HttpStatus.OK,
    description: '유저 본인 탈퇴',
    type: StatusResponse,
  })
  async leave(@User() user: UserResponse): Promise<any> {
    return this.authService.leave(user);
  }
}
