import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetUserMetricsService } from '@/services/factories/make-get-user-metrics-service'

export async function metricsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { checkInsCount } = await makeGetUserMetricsService().execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({ checkInsCount })
}
