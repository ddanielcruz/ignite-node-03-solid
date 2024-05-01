import { FastifyInstance } from 'fastify'

import { authenticateController } from './controllers/authenticate-controller'
import { profileController } from './controllers/profile-controller'
import { registerController } from './controllers/register-controller'
import { verifyJwt } from './middleware/verify-jwt'

export async function routes(app: FastifyInstance) {
  app.post('/sessions', authenticateController)
  app.post('/users', registerController)

  // Authenticated
  app.get('/users/me', { onRequest: verifyJwt }, profileController)
}
