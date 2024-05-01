import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeValidateCheckInService } from '@/services/factories/make-validate-check-in-service'

export async function validateController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    checkInId: z.string().cuid(),
  })

  const params = paramsSchema.parse(request.params)
  await makeValidateCheckInService().execute({
    userId: request.user.sub,
    checkInId: params.checkInId,
  })

  return reply.status(204).send()
}
