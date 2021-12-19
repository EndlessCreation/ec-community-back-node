import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { StatusType } from 'src/constants/status-type';
import { UserResponse } from 'src/modules/user/dto/user-response.dto';
import { RoleRepository } from 'src/repositories/role.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { AuthService } from '../auth/auth.service';
import { AuthResponse } from '../auth/dto/auth-response.dto';

@Injectable()
export class OauthService {
  constructor(private userRepository: UserRepository, private roleRepository: RoleRepository, private authService: AuthService) {}

  async kakaoGetUser(accessToken: any) {
    try {
      const user = await axios.get<any>('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return user.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        throw new HttpException(error.response.data.msg, error.response.status);
      } else {
        console.error(error);
        throw new HttpException('Wrong Type', 500);
      }
    }
  }

  async googleGetUser(accessToken: any) {
    try {
      const user = await axios.get<any>('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return user.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        throw new HttpException(error.response.data.msg, error.response.status);
      } else {
        console.error(error);
        throw new HttpException('Wrong Type', 500);
      }
    }
  }

  async authentication(userRequest: UserResponse): Promise<AuthResponse> {
    let status: StatusType;
    let user = await this.userRepository.findByUnique({
      email: userRequest.email,
    });

    if (user == undefined) {
      status = StatusType.AUTH;
      user = await this.userRepository.create(userRequest);
    } else if (user.year == null) {
      status = StatusType.AUTH;
    } else {
      const userWithRole = await this.roleRepository.findAllWithUserRoleByUser(user.id);
      status = userWithRole.length ? StatusType.LOGIN : StatusType.WAIT;
    }

    const accessToken = await this.authService.generateAccessToken(user);
    return new AuthResponse(accessToken, status);
  }
}
