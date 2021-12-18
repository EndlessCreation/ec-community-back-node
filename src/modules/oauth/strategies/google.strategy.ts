import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-custom';
import { OauthResponse } from '../dto/oauth-response.dto';
import { OauthService } from '../oauth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private oauthService: OauthService) {
    super();
  }

  async validate(req: Request): Promise<OauthResponse> {
    const user = await this.oauthService.googleGetUser(req.body.accessToken);
    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      email: user.email,
    };
  }
}
