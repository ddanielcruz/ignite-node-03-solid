import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetUserProfileService } from './get-user-profile-service'

let sut: GetUserProfileService
let usersRepository: InMemoryUsersRepository

describe('GetUserProfileService', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileService(usersRepository)
  })

  it('throws if user is not found', async () => {
    const promise = sut.execute({ userId: 'any-id' })
    await expect(promise).rejects.toThrow(ResourceNotFoundError)
  })

  it('gets user profile', async () => {
    const createdUser = await usersRepository.create({
      email: 'any-email',
      name: 'any-name',
      passwordHash: 'any-password-hash',
    })

    const { user } = await sut.execute({ userId: createdUser.id })
    expect(user).toEqual(createdUser)
  })
})
