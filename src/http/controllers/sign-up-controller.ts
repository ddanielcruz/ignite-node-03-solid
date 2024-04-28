import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateUserService } from '@/services/create-user-service'
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error'

const signUpBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

export async function signUpController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = signUpBodySchema.parse(request.body)
  const usersRepository = new PrismaUsersRepository()
  const createUserService = new CreateUserService(usersRepository)

  try {
    await createUserService.execute(body)
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    return reply.status(500).send({ message: 'Internal server error' })
  }
}
