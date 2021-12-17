import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { User } from 'src/decorators/auth.decorators';
import { GoogleOauthGuard } from 'src/guards/google-oauth.guard';
import { KakaoOauthGuard } from 'src/guards/kakao-oauth.guard';
import { UserResponse } from '../user/dto/user-response.dto';
import { AuthResponse } from './dto/auth-response.dto';
import { OauthRequest } from './dto/oauth-request.dto';
import { OauthService } from './services/oauth.service';

@Controller('auth')
export class AuthController {
  constructor(private oauthService: OauthService) {}

  @ApiBody({ type: OauthRequest })
  @UseGuards(KakaoOauthGuard)
  @Post('kakao')
  async kakao(@User() user: UserResponse): Promise<AuthResponse> {
    return this.oauthService.authentication(user);
  }

  @ApiBody({ type: OauthRequest })
  @UseGuards(GoogleOauthGuard)
  @Post('google')
  async google(@User() user: UserResponse): Promise<AuthResponse> {
    return this.oauthService.authentication(user);
  }

  @ApiBody({ type: OauthRequest })
  @Post('test')
  async test(@Body() data: any): Promise<any> {
    return this.oauthService.kakaoGetUser(data.accessToken);
  }
}
