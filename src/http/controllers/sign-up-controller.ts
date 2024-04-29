import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error'
import { makeCreateUserService } from '@/services/factories/make-create-user-service'

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
  const createUserService = makeCreateUserService()

  try {
    await createUserService.execute(body)

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
