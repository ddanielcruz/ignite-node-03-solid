import { PrismaClient } from '@prisma/client'

import { isDev } from '@/env'

export const prisma = new PrismaClient({
  log: isDev ? ['query'] : [],
})
