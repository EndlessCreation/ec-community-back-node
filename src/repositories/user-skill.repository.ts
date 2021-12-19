import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserSkillRepository {
  constructor(private prisma: PrismaService) {}

  async createAll(data: Array<{ userId: number; skillId: number }>): Promise<Prisma.BatchPayload> {
    return this.prisma.userSkill.createMany({ data });
  }

  async deleteAll(userId: number): Promise<Prisma.BatchPayload> {
    return this.prisma.userSkill.deleteMany({ where: { userId } });
  }
}
