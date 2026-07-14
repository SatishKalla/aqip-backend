import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../persistence/prisma/prisma.service';

const userSelect = {
  id: true,
  email: true,
  displayName: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect;

export type IdentityUser = Prisma.UserGetPayload<{ select: typeof userSelect }>;

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  findById(id: string): Promise<IdentityUser | null> {
    return this.prismaService.user.findUnique({
      where: { id },
      select: userSelect,
    });
  }

  findByEmail(email: string): Promise<IdentityUser | null> {
    return this.prismaService.user.findUnique({
      where: { email },
      select: userSelect,
    });
  }
}
