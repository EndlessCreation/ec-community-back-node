import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async findByUnique(uniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({ where: uniqueInput });
  }

  async findWithRoles(uniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: uniqueInput,
      include: {
        UserRole: {
          select: {
            Role: true,
          },
        },
      },
    });
  }

  async updateByUnique(uniqueInput: Prisma.UserWhereUniqueInput, userUpdateInput: Prisma.UserUpdateInput): Promise<User | null> {
    return this.prisma.user.update({
      where: uniqueInput,
      data: userUpdateInput,
    });
  }

  async deleteByUnique(uniqueInput: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({ where: uniqueInput });
  }
}
