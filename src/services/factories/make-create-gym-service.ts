import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

import { CreateGymService } from '../create-gym-service'

export function makeCreateGymService() {
  return new CreateGymService(new PrismaGymsRepository())
}
