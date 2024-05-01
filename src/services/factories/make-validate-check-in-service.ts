import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

import { ValidateCheckInService } from '../validate-check-in-service'

export function makeValidateCheckInService() {
  return new ValidateCheckInService(new PrismaCheckInsRepository())
}
