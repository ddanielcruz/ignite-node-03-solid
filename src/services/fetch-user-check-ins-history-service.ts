import { CheckInsRepository } from '@/repositories/check-ins-repository'

export type FetchUserCheckInsHistoryRequest = {
  userId: string
  page?: number
}

export class FetchUserCheckInsHistoryService {
  constructor(private readonly checkInsRepository: CheckInsRepository) {}

  async execute({ userId, page }: FetchUserCheckInsHistoryRequest) {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return { checkIns }
  }
}
