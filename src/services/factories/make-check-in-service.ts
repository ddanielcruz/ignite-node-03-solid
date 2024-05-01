import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

import { CheckInService } from '../check-in-service'

export function makeCheckInService() {
  return new CheckInService(
    new PrismaCheckInsRepository(),
    new PrismaGymsRepository(),
  )
}
