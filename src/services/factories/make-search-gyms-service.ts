import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

import { SearchGymsService } from '../search-gyms-service'

export function makeSearchGymsService() {
  return new SearchGymsService(new PrismaGymsRepository())
}
