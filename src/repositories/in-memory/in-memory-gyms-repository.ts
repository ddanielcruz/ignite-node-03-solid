import { randomUUID } from 'node:crypto'

import { Gym, Prisma } from '@prisma/client'

import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

import { FindManyNearbyParams, GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  gyms: Gym[] = []

  async create(data: Prisma.GymUncheckedCreateInput): Promise<Gym> {
    const gym: Gym = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    }

    this.gyms.push(gym)

    return gym
  }

  async findById(id: string): Promise<Gym | null> {
    return this.gyms.find((gym) => gym.id === id) ?? null
  }

  async findManyNearby(coordinates: FindManyNearbyParams): Promise<Gym[]> {
    return this.gyms.filter((gym) => {
      const distance = getDistanceBetweenCoordinates(coordinates, {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      })

      return distance <= 10
    })
  }

  async search(query: string, page: number): Promise<Gym[]> {
    return this.gyms
      .filter((gym) =>
        gym.name.toLowerCase().includes(query.trim().toLowerCase()),
      )
      .slice((page - 1) * 20, page * 20)
  }
}
