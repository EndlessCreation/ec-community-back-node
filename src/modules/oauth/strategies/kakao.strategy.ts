import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-custom';
import { OauthResponse } from '../dto/oauth-response.dto';
import { OauthService } from '../oauth.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private oauthService: OauthService) {
    super();
  }

  async validate(req: Request): Promise<OauthResponse> {
    const user = await this.oauthService.kakaoGetUser(req.body.accessToken);
    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      email: user.kakao_account.email,
    };
  }
}
