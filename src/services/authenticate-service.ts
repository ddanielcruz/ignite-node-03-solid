import { compare } from 'bcryptjs'

import type { UsersRepository } from '@/repositories/users-repository'

import { InvalidCredentialsError } from './errors/invalid-credentials-error'

type AuthenticateRequest = {
  email: string
  password: string
}

export class AuthenticateService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ email, password }: AuthenticateRequest) {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new InvalidCredentialsError()
    }

    const isPasswordCorrect = await compare(password, user.passwordHash)
    if (!isPasswordCorrect) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
