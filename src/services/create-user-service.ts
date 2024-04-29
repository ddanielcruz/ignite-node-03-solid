import bcrypt from 'bcryptjs'

import { env } from '@/env'
import { UsersRepository } from '@/repositories/users-repository'

import { UserAlreadyExistsError } from './errors/user-already-exists-error'

type CreateUserRequest = {
  email: string
  password: string
  name: string
}

export class CreateUserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ email, password, name }: CreateUserRequest) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError('Email already in use.')
    }

    const passwordSalt = await bcrypt.genSalt(env.PASSWORD_SALT_ROUNDS)
    const passwordHash = await bcrypt.hash(password, passwordSalt)

    const user = await this.usersRepository.create({
      name,
      email,
      passwordHash,
      passwordSalt,
    })

    return { user }
  }
}
