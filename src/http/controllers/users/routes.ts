import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../../middleware/verify-jwt'
import { authenticateController } from './authenticate-controller'
import { profileController } from './profile-controller'
import { refreshController } from './refresh-controller'
import { registerController } from './register-controller'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticateController)
  app.post('/users', registerController)

  app.patch('/sessions/refresh', refreshController)

  // Authenticated
  app.get('/users/me', { onRequest: verifyJwt }, profileController)
}
