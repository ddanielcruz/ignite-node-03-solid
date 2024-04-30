import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

export interface CheckInRequest {
  gymId: string
  userId: string
  userLatitude: number
  userLongitude: number
}

const MAX_DISTANCE_IN_KILOMETERS = 0.1 // 100m

export class CheckInService {
  constructor(
    private readonly checkInsRepository: CheckInsRepository,
    private readonly gymsRepository: GymsRepository,
  ) {}

  async execute({
    gymId,
    userId,
    userLatitude,
    userLongitude,
  }: CheckInRequest) {
    const gym = await this.gymsRepository.findById(gymId)
    if (!gym) {
      throw new ResourceNotFoundError()
    }

    // Calculate user distance is less than 100m
    const distance = getDistanceBetweenCoordinates(
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
    )

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new Error('User is not close enough to the gym')
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDay) {
      throw new Error('User already checked in')
    }

    const checkIn = await this.checkInsRepository.create({ gymId, userId })

    return { checkIn }
  }
}
