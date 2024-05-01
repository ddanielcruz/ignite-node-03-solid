import { FastifyInstance } from 'fastify'

import { profileController } from './controllers/profile-controller'
import { signInController } from './controllers/sign-in-controller'
import { signUpController } from './controllers/sign-up-controller'
import { verifyJwt } from './middleware/verify-jwt'

export async function routes(app: FastifyInstance) {
  app.post('/sign-in', signInController)
  app.post('/sign-up', signUpController)

  // Authenticated
  app.get('/users/me', { onRequest: verifyJwt }, profileController)
}
