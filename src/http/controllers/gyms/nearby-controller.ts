import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFetchNearbyGymsService } from '@/services/factories/make-fetch-nearby-gyms-service'

export async function nearbyController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
  })

  const query = nearbyGymsQuerySchema.parse(request.query)
  const { gyms } = await makeFetchNearbyGymsService().execute({
    userLatitude: query.latitude,
    userLongitude: query.longitude,
  })

  return reply.status(200).send(gyms)
}
