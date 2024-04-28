import fastify from 'fastify'
import { ZodError } from 'zod'

import { isProd } from './env'
import { routes } from './http/routes'

export const app = fastify()

app.register(routes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (!isProd) {
    console.error(error)
  } else {
    // TODO Send error to monitoring service
  }

  reply.status(500).send({ message: 'Internal server error' })
})
