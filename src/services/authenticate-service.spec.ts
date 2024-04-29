import { hash } from 'bcryptjs'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { AuthenticateService } from './authenticate-service'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let sut: AuthenticateService
let usersRepository: InMemoryUsersRepository

describe('AuthenticateService', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateService(usersRepository)
  })

  it('throws if user is not found by email', async () => {
    const promise = sut.execute({
      email: 'any@email.com',
      password: 'any-password',
    })

    await expect(promise).rejects.toThrow(InvalidCredentialsError)
  })

  it('throws if password is incorrect', async () => {
    const passwordHash = await hash('correct-password', 1)
    await usersRepository.create({
      name: 'Any Name',
      email: 'any@email.com',
      passwordHash,
    })

    const promise = sut.execute({
      email: 'any@email.com',
      password: 'incorrect-password',
    })

    await expect(promise).rejects.toThrow(InvalidCredentialsError)
  })

  it('returns user on successful authentication', async () => {
    const passwordHash = await hash('any-password', 1)
    const createdUser = await usersRepository.create({
      name: 'Any Name',
      email: 'any@email.com',
      passwordHash,
    })

    const { user } = await sut.execute({
      email: 'any@email.com',
      password: 'any-password',
    })

    expect(user).toEqual(createdUser)
  })
})
