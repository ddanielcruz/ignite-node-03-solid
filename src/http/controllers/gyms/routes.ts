import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middleware/verify-jwt'
import { verifyUserRole } from '@/http/middleware/verify-user-role'

import { createController } from './create-controller'
import { nearbyController } from './nearby-controller'
import { searchController } from './search-controller'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/gyms/nearby', nearbyController)
  app.get('/gyms/search', searchController)

  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, createController)
}
