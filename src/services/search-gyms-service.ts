import { GymsRepository } from '@/repositories/gyms-repository'

export type SearchGymsRequest = {
  query: string
  page: number
}

export class SearchGymsService {
  constructor(private readonly gymsRepo: GymsRepository) {}

  async execute({ query, page }: SearchGymsRequest) {
    const gyms = await this.gymsRepo.search(query, page)

    return { gyms }
  }
}
