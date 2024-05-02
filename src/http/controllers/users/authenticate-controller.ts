import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeAuthenticateService } from '@/services/factories/make-authenticate-service'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export async function authenticateController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = authenticateBodySchema.parse(request.body)
  const authenticateService = makeAuthenticateService()

  try {
    const { user } = await authenticateService.execute(body)
    const accessToken = await reply.jwtSign(
      { role: user.role },
      { sign: { sub: user.id } },
    )
    const refreshToken = await reply.jwtSign(
      { role: user.role },
      { sign: { sub: user.id, expiresIn: '7d' } },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        httpOnly: true,
        sameSite: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      })
      .send({ token: accessToken })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message })
    }

    throw error
  }
}
