import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { addMinutes } from 'src/utils/day.util';
import { UserResponse } from '../../user/dto/user-response.dto';
import { TokenDto } from '../dto/token.dto';

const BASE_OPTION: JwtSignOptions = {
  issuer: 'endlesscreation.kr',
};

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateAccessToken(user: UserResponse): Promise<TokenDto> {
    const options: JwtSignOptions = {
      ...BASE_OPTION,
    };

    return {
      accessToken: await this.jwtService.signAsync({ user }, options),
      expiresIn: addMinutes(30).valueOf(),
    };
  }
}
