import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

import { FetchNearbyGymsService } from '../fetch-nearby-gyms-service'

export function makeFetchNearbyGymsService() {
  return new FetchNearbyGymsService(new PrismaGymsRepository())
}
