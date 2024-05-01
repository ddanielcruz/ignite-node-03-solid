import type { Gym } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import {
  CreateGymData,
  FindManyNearbyParams,
  GymsRepository,
} from '../gyms-repository'

export class PrismaGymsRepository implements GymsRepository {
  async create(data: CreateGymData): Promise<Gym> {
    return await prisma.gym.create({ data })
  }

  async findById(id: string): Promise<Gym | null> {
    return await prisma.gym.findUnique({ where: { id } })
  }

  async findManyNearby({
    latitude,
    longitude,
  }: FindManyNearbyParams): Promise<Gym[]> {
    return await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `
  }

  async search(query: string, page: number): Promise<Gym[]> {
    return await prisma.gym.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
      skip: page ? (page - 1) * 20 : 0,
      take: 20,
    })
  }
}
