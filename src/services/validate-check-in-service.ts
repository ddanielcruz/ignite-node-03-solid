import dayjs from 'dayjs'

import { CheckInsRepository } from '@/repositories/check-ins-repository'

import { LateCheckInValidationError } from './errors/late-check-in-validation-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

export type ValidateCheckInRequest = {
  userId: string
  checkInId: string
}

export class ValidateCheckInService {
  constructor(private readonly checkInsRepository: CheckInsRepository) {}

  async execute({ userId, checkInId }: ValidateCheckInRequest) {
    const checkIn = await this.checkInsRepository.findById(checkInId)
    if (!checkIn || checkIn.userId !== userId) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCreation = dayjs().diff(
      checkIn.createdAt,
      'minutes',
    )

    if (distanceInMinutesFromCreation >= 20) {
      throw new LateCheckInValidationError()
    }

    checkIn.validatedAt = new Date()
    await this.checkInsRepository.save(checkIn)

    return { checkIn }
  }
}

export type ValidateCheckInResponse = Awaited<
  ReturnType<ValidateCheckInService['execute']>
>
