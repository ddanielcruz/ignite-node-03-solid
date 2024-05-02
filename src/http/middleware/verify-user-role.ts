import { UserRole } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'

export const verifyUserRole =
  (role: UserRole) => async (request: FastifyRequest, reply: FastifyReply) => {
    const userRole = request.user?.role
    if (userRole !== role) {
      return reply.status(403).send({ message: 'Forbidden.' })
    }
  }
