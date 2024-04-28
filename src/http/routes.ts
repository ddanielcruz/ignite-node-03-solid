import { FastifyInstance } from 'fastify'

import { signUpController } from './controllers/sign-up-controller'

export async function routes(app: FastifyInstance) {
  app.post('/sign-up', signUpController)
}
