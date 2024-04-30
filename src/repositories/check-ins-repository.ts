import type { CheckIn, Prisma } from '@prisma/client'

export type CreateCheckInData = Pick<
  Prisma.CheckInUncheckedCreateInput,
  'gymId' | 'userId' | 'validatedAt'
>

export interface CheckInsRepository {
  create(data: CreateCheckInData): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
}
