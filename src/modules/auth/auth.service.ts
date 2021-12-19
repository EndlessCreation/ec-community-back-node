import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { StatusResponse } from 'src/common/dto/status-response.dto';
import { UserRepository } from 'src/repositories/user.repository';
import { addMinutes } from 'src/utils/day.util';
import { UserResponse } from '../user/dto/user-response.dto';
import { UserUpdateRequest } from '../user/dto/user-update-request.dto';
import { TokenResponse } from './dto/token-response.dto';

const BASE_OPTION: JwtSignOptions = {
  issuer: 'endlesscreation.kr',
};

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private userRepository: UserRepository) {}

  async generateAccessToken(user: UserResponse): Promise<TokenResponse> {
    const options: JwtSignOptions = {
      ...BASE_OPTION,
    };

    return {
      accessToken: await this.jwtService.signAsync({ user }, options),
      expiresIn: addMinutes(30).valueOf(),
    };
  }

  async join(user: UserResponse, data: UserUpdateRequest): Promise<UserResponse> {
    const updatedUser = await this.userRepository.updateByUnique({ id: user.id }, data);

    return new UserResponse(updatedUser);
  }

  async leaveOrKicked(userId: number): Promise<StatusResponse> {
    await this.userRepository.deleteByUnique({ id: userId });

    return new StatusResponse(true);
  }
}
