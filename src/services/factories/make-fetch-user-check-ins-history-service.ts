import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

import { FetchUserCheckInsHistoryService } from '../fetch-user-check-ins-history-service'

export function makeFetchUserCheckInsHistoryService() {
  return new FetchUserCheckInsHistoryService(new PrismaCheckInsRepository())
}
