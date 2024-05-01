import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

import { GetUserMetricsService } from '../get-user-metrics-service'

export function makeGetUserMetricsService() {
  return new GetUserMetricsService(new PrismaCheckInsRepository())
}
