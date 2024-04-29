import type { UsersRepository } from '@/repositories/users-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

type GetUserProfileRequest = {
  userId: string
}

export class GetUserProfileService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ userId }: GetUserProfileRequest) {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
