import { FastifyInstance } from 'fastify'

import { profileController } from './controllers/profile-controller'
import { signInController } from './controllers/sign-in-controller'
import { signUpController } from './controllers/sign-up-controller'

export async function routes(app: FastifyInstance) {
  app.get('/me', profileController)
  app.post('/sign-in', signInController)
  app.post('/sign-up', signUpController)
}
