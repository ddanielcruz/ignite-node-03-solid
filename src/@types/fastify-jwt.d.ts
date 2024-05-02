import '@fastify/jwt'

import { UserRole } from '@prisma/client'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    payload: {
      role: UserRole
    }
    user: {
      sub: string
      role: UserRole
    }
  }
}
