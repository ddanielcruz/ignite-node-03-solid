import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeSearchGymsService } from '@/services/factories/make-search-gyms-service'

export async function searchController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchGymsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q: query, page } = searchGymsQuerySchema.parse(request.query)
  const { gyms } = await makeSearchGymsService().execute({ query, page })

  return reply.status(200).send(gyms)
}
