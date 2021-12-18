import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserRepository } from 'src/repositories/user.repository';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  providers: [UserService, UserRepository],
  controllers: [],
  exports: [UserService, UserRepository],
})
export class UserModule {}
