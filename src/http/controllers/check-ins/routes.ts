import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middleware/verify-jwt'
import { verifyUserRole } from '@/http/middleware/verify-user-role'

import { createController } from './create-controller'
import { historyController } from './history-controller'
import { metricsController } from './metrics-controller'
import { validateController } from './validate-controller'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/check-ins/history', historyController)
  app.get('/check-ins/metrics', metricsController)
  app.post('/gyms/:gymId/check-ins', createController)

  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    validateController,
  )
}
