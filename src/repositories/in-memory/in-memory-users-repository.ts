import type { User } from '@prisma/client'

import type { CreateUserData, UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  users: User[] = []

  async create(data: CreateUserData): Promise<User> {
    const user: User = {
      ...data,
      id: String(Date.now()),
      createdAt: new Date(),
    }

    this.users.push(user)

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) ?? null
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) ?? null
  }
}
