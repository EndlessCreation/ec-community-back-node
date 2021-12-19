import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RoleRepository } from 'src/repositories/role.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { ApiConfigService } from 'src/shared/services/api-config.service';
import { AuthService } from '../auth/auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ApiConfigService) => ({
        secret: configService.authConfig.jwtSecret,
        signOptions: {
          expiresIn: configService.authConfig.jwtExpirationTime,
        },
      }),
      inject: [ApiConfigService],
    }),
    PrismaModule,
    PassportModule,
  ],
  providers: [AuthService, JwtStrategy, UserRepository, RoleRepository],
  controllers: [AuthController],
  exports: [AuthService, JwtModule, RoleRepository],
})
export class AuthModule {}
