import type { User } from '@prisma/client'

export type CreateUserData = Pick<
  User,
  'name' | 'email' | 'passwordHash' | 'passwordSalt'
>

export interface UsersRepository {
  create(data: CreateUserData): Promise<User>
  findByEmail(email: string): Promise<User | null>
}
