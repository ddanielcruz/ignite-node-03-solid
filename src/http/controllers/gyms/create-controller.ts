import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreateGymService } from '@/services/factories/make-create-gym-service'

export async function createController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createGymSchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.number().refine((value) => Math.abs(value) <= 180),
  })

  const data = createGymSchema.parse(request.body)
  const createGym = makeCreateGymService()
  await createGym.execute({
    name: data.name,
    description: data.description,
    phone: data.phone,
    latitude: data.latitude,
    longitude: data.longitude,
  })

  return reply.status(201).send()
}
