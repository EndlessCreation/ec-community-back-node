import { Injectable } from '@nestjs/common';
import { Prisma, Skill } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SkillRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.SkillCreateInput): Promise<Skill> {
    return this.prisma.skill.create({ data });
  }

  async findAllByWhereOptionOrderByOrderOption(pagination, whereOption): Promise<Skill[] | null> {
    return await this.prisma.skill.findMany({
      take: pagination.take,
      where: {
        AND: whereOption,
      },
    });
  }
}
