import request from 'supertest'

import { app } from '@/app'

describe('Sign In (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/sign-up').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'john.doe',
    })

    const response = await request(app.server).post('/sign-in').send({
      email: 'johndoe@example.com',
      password: 'john.doe',
    })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ token: expect.any(String) })
  })
})
