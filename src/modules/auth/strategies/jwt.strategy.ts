import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ApiConfigService } from '../../../shared/services/api-config.service';
import { UserResponse } from '../../user/dto/user-response.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(public readonly configService: ApiConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.authConfig.jwtSecret,
    });
  }

  async validate(payload: any): Promise<UserResponse> {
    return new UserResponse(payload.user);
  }
}
