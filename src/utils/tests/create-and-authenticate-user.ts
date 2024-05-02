import { UserRole } from '@prisma/client'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

import { prisma } from '@/lib/prisma'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  role: UserRole = 'MEMBER',
) {
  const email = `user-${Date.now()}@example.com`
  const password = '123456'

  await request(app.server).post('/users').send({
    name: 'John Doe',
    email,
    password,
  })

  if (role !== 'MEMBER') {
    await prisma.user.update({
      where: { email },
      data: { role },
    })
  }

  const response = await request(app.server)
    .post('/sessions')
    .send({ email, password })

  const token: string = response.body.token

  return {
    token,
    user: {
      email,
    },
  }
}
