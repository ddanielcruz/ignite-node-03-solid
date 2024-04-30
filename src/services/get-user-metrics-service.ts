import { CheckInsRepository } from '@/repositories/check-ins-repository'

export type GetUserMetricsRequest = {
  userId: string
}

export class GetUserMetricsService {
  constructor(private readonly checkInsRepo: CheckInsRepository) {}

  async execute({ userId }: GetUserMetricsRequest) {
    const checkInsCount = await this.checkInsRepo.countByUserId(userId)

    return { checkInsCount }
  }
}
