import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RoleRepository } from 'src/repositories/role.repository';
import { UserRoleRepository } from 'src/repositories/user-role.repository';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports: [PrismaModule],
  providers: [RoleService, RoleRepository, UserRoleRepository],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}
