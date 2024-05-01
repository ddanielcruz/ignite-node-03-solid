import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../../middleware/verify-jwt'
import { authenticateController } from './authenticate-controller'
import { profileController } from './profile-controller'
import { registerController } from './register-controller'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticateController)
  app.post('/users', registerController)

  // Authenticated
  app.get('/users/me', { onRequest: verifyJwt }, profileController)
}
