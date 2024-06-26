import type { User } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { CreateUserData, UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: CreateUserData): Promise<User> {
    return await prisma.user.create({ data })
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } })
  }

  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id } })
  }
}
