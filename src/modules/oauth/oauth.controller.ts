import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorators';
import { GoogleOauthGuard } from 'src/guards/google-oauth.guard';
import { KakaoOauthGuard } from 'src/guards/kakao-oauth.guard';
import { AuthResponse } from '../auth/dto/auth-response.dto';
import { UserResponse } from '../user/dto/user-response.dto';
import { OauthRequest } from './dto/oauth-request.dto';
import { OauthService } from './oauth.service';

@Controller('oauth')
@ApiTags('OAuth')
export class OauthController {
  constructor(private oauthService: OauthService) {}

  @Post('kakao')
  @UseGuards(KakaoOauthGuard)
  @ApiBody({ type: OauthRequest })
  async kakao(@User() user: UserResponse): Promise<AuthResponse> {
    return this.oauthService.authentication(user);
  }

  @Post('google')
  @UseGuards(GoogleOauthGuard)
  @ApiBody({ type: OauthRequest })
  async google(@User() user: UserResponse): Promise<AuthResponse> {
    return this.oauthService.authentication(user);
  }
}
