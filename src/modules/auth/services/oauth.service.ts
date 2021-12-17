import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { UserResponse } from 'src/modules/user/dto/user-response.dto';
import { UserRepository } from 'src/repositories/user.repository';
import { AuthResponse } from '../dto/auth-response.dto';
import { AuthService } from './auth.service';

@Injectable()
export class OauthService {
  constructor(private userRepository: UserRepository, private authService: AuthService) {}

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
    const user = await axios({
      url: 'https://www.googleapis.com/oauth2/v2/userinfo',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return user.data;
  }

  async authentication(userRequest: UserResponse): Promise<AuthResponse> {
    let isNew = false;
    let user = await this.userRepository.findByUnique({
      email: userRequest.email,
    });

    if (user == undefined) {
      isNew = true;
      user = await this.userRepository.create(userRequest);
    }

    const accessToken = await this.authService.generateAccessToken(user);
    return new AuthResponse(accessToken, isNew);
  }
}
