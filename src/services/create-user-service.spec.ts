import { compare } from 'bcryptjs'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { CreateUserService } from './create-user-service'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let sut: CreateUserService
let usersRepository: InMemoryUsersRepository

describe('CreateUserService', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateUserService(usersRepository)
  })

  it('hashes the password before saving the user', async () => {
    const password = 'any-password'
    const { user } = await sut.execute({
      name: 'Any Name',
      email: 'any@email.com',
      password,
    })

    expect(user.passwordHash).not.toBe(password)
    expect(user.passwordHash).toBeTruthy()
    expect(user.passwordSalt).toBeTruthy()

    const isPasswordCorrectlyHashed = await compare(password, user.passwordHash)
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('throws if email is already in use', async () => {
    const email = 'any@email.com'
    await sut.execute({
      email,
      name: 'User 1',
      password: 'password-1',
    })

    const promise = sut.execute({
      email,
      name: 'User 2',
      password: 'password-2',
    })

    await expect(promise).rejects.toThrow(UserAlreadyExistsError)
  })
})
