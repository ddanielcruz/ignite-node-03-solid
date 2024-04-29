import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

import { CreateUserService } from '../create-user-service'

export function makeCreateUserService() {
  const prismaUsersRepository = new PrismaUsersRepository()
  return new CreateUserService(prismaUsersRepository)
}
