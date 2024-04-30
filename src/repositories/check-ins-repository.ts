import type { CheckIn, Prisma } from '@prisma/client'

export type CreateCheckInData = Pick<
  Prisma.CheckInUncheckedCreateInput,
  'gymId' | 'userId' | 'validatedAt'
>

export interface CheckInsRepository {
  countByUserId(userId: string): Promise<number>
  create(data: CreateCheckInData): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyByUserId(userId: string, page?: number): Promise<CheckIn[]>
}
