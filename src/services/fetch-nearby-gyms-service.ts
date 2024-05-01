import { GymsRepository } from '@/repositories/gyms-repository'

export type FetchNearbyGymsRequest = {
  userLatitude: number
  userLongitude: number
}

export class FetchNearbyGymsService {
  constructor(private readonly gymsRepository: GymsRepository) {}

  async execute(request: FetchNearbyGymsRequest) {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: request.userLatitude,
      longitude: request.userLongitude,
    })

    return { gyms }
  }
}
