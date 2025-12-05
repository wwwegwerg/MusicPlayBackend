import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export type PublicUser = {
  id: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
};

type UserWithPassword = PublicUser & { password: string };

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(username: string, passwordHash: string): Promise<PublicUser> {
    const user = await this.prisma.user.create({
      data: { username, password: passwordHash }
    });

    return this.toPublic(user)!;
  }

  async findByUsername(username: string): Promise<UserWithPassword | null> {
    return (await this.prisma.user.findUnique({ where: { username } })) as UserWithPassword | null;
  }

  async findById(id: string): Promise<UserWithPassword | null> {
    return (await this.prisma.user.findUnique({ where: { id } })) as UserWithPassword | null;
  }

  toPublic(user: UserWithPassword | null): PublicUser | null {
    if (!user) {
      return null;
    }

    // Strip password hash before returning user data
    const { password, ...rest } = user;
    return rest;
  }
}
