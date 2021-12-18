import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { RoleRequest } from 'src/modules/role/dto/role-request.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoleRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.RoleCreateInput): Promise<Role> {
    return this.prisma.role.create({ data });
  }

  async findAll(): Promise<Role[]> {
    return this.prisma.role.findMany();
  }

  async findAllWithUserRoleByUser(user: Prisma.UserWhereUniqueInput): Promise<Role[]> {
    return this.prisma.role.findMany({
      include: {
        userRole: { where: { User: user } },
      },
    });
  }

  async updateByUnique(roleUnique: Prisma.RoleWhereUniqueInput, data: RoleRequest): Promise<Role> {
    return this.prisma.role.update({
      where: roleUnique,
      data,
    });
  }

  async deleteByUnique(roleUnique: Prisma.RoleWhereUniqueInput): Promise<Role> {
    return this.prisma.role.delete({ where: roleUnique });
  }
}
