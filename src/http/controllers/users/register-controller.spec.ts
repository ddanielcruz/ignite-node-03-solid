import request from 'supertest'

import { app } from '@/app'

describe('Sign Up (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to sign up', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'john.doe',
    })

    expect(response.statusCode).toEqual(201)
  })
})
