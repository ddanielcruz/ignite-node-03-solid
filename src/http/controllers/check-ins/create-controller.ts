import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCheckInService } from '@/services/factories/make-check-in-service'

export async function createController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({ gymId: z.string().cuid() })
  const bodySchema = z.object({
    latitude: z.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.number().refine((value) => Math.abs(value) <= 180),
  })

  const params = paramsSchema.parse(request.params)
  const body = bodySchema.parse(request.body)
  await makeCheckInService().execute({
    gymId: params.gymId,
    userId: request.user.sub,
    userLatitude: body.latitude,
    userLongitude: body.longitude,
  })

  return reply.status(201).send()
}
