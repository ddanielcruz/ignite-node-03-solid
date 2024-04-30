import { Gym, Prisma } from '@prisma/client'

export type CreateGymData = Prisma.GymUncheckedCreateInput

export interface GymsRepository {
  create(data: CreateGymData): Promise<Gym>
  findById(id: string): Promise<Gym | null>
}
