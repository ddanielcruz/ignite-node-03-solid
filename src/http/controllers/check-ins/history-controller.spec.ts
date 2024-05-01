import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'

describe('Fetch Check-ins History (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list the history of check-ins', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const user = await prisma.user.findFirstOrThrow()
    const gym = await prisma.gym.create({
      data: {
        name: 'any_gym_name',
        latitude: 0,
        longitude: 0,
      },
    })
    await prisma.checkIn.createMany({
      data: [
        { userId: user.id, gymId: gym.id },
        { userId: user.id, gymId: gym.id },
      ],
    })

    const response = await request(app.server)
      .get('/check-ins/history')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(2)
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          gymId: gym.id,
          userId: user.id,
        }),
        expect.objectContaining({
          gymId: gym.id,
          userId: user.id,
        }),
      ]),
    )
  })
})
