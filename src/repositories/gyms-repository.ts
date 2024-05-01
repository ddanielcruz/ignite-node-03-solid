import { Gym, Prisma } from '@prisma/client'

export type CreateGymData = Prisma.GymUncheckedCreateInput

export type FindManyNearbyParams = {
  latitude: number
  longitude: number
}

export interface GymsRepository {
  create(data: CreateGymData): Promise<Gym>
  findById(id: string): Promise<Gym | null>
  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>
  search(query: string, page: number): Promise<Gym[]>
}
