import { randomUUID } from 'node:crypto'

import type { CheckIn } from '@prisma/client'

import type {
  CheckInsRepository,
  CreateCheckInData,
} from '../check-ins-repository'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  checkIns: CheckIn[] = []

  async create(data: CreateCheckInData): Promise<CheckIn> {
    const checkIn: CheckIn = {
      ...data,
      id: randomUUID(),
      validatedAt: data.validatedAt ? new Date(data.validatedAt) : null,
      createdAt: new Date(),
    }

    this.checkIns.push(checkIn)

    return checkIn
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const checkIn = this.checkIns.find(
      (checkIn) =>
        checkIn.userId === userId &&
        checkIn.createdAt.toDateString() === date.toDateString(),
    )

    return checkIn ?? null
  }
}
