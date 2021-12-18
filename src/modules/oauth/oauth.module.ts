import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RoleRepository } from 'src/repositories/role.repository';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { KakaoStrategy } from './strategies/kakao.strategy';

@Module({
  imports: [AuthModule, PrismaModule, PassportModule, UserModule],
  providers: [OauthService, KakaoStrategy, GoogleStrategy, RoleRepository],
  controllers: [OauthController],
})
export class OauthModule {}
