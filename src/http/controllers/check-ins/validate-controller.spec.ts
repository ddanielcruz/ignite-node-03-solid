import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'

describe('Validate Check-In (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app, 'ADMIN')
    const user = await prisma.user.findFirstOrThrow()
    const gym = await prisma.gym.create({
      data: {
        name: 'any_gym_name',
        latitude: 0,
        longitude: 0,
      },
    })
    let checkIn = await prisma.checkIn.create({
      data: {
        userId: user.id,
        gymId: gym.id,
      },
    })

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: { id: checkIn.id },
    })

    expect(response.status).toBe(204)
    expect(checkIn.validatedAt).not.toBeNull()
  })
})
