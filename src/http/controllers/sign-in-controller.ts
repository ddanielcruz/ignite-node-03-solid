import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeAuthenticateService } from '@/services/factories/make-authenticate-service'

const signInBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export async function signInController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = signInBodySchema.parse(request.body)
  const authenticateService = makeAuthenticateService()

  try {
    const { user } = await authenticateService.execute(body)
    const token = await reply.jwtSign({}, { sign: { sub: user.id } })

    return reply.send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message })
    }

    throw error
  }
}
