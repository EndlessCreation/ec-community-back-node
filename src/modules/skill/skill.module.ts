import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SkillRepository } from 'src/repositories/skill.repository';
import { UserSkillRepository } from 'src/repositories/user-skill.repository';
import { AuthModule } from '../auth/auth.module';
import { SkillController } from './skill.controller';
import { SkillService } from './skill.service';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [SkillService, SkillRepository, UserSkillRepository],
  controllers: [SkillController],
})
export class SkillModule {}
