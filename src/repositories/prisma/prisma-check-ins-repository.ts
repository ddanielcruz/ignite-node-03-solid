import type { CheckIn } from '@prisma/client'
import dayjs from 'dayjs'

import { prisma } from '@/lib/prisma'

import { CheckInsRepository, CreateCheckInData } from '../check-ins-repository'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async countByUserId(userId: string): Promise<number> {
    return await prisma.checkIn.count({ where: { userId } })
  }

  async create(data: CreateCheckInData): Promise<CheckIn> {
    return await prisma.checkIn.create({ data })
  }

  async findById(id: string): Promise<CheckIn | null> {
    return await prisma.checkIn.findUnique({ where: { id } })
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    return await prisma.checkIn.findFirst({
      where: {
        userId,
        createdAt: {
          gte: dayjs(date).startOf('day').toDate(),
          lt: dayjs(date).endOf('day').toDate(),
        },
      },
    })
  }

  async findManyByUserId(
    userId: string,
    page?: number | undefined,
  ): Promise<CheckIn[]> {
    return await prisma.checkIn.findMany({
      where: { userId },
      skip: page ? (page - 1) * 20 : 0,
      take: 20,
    })
  }

  async save(checkIn: CheckIn): Promise<CheckIn> {
    return await prisma.checkIn.update({
      where: { id: checkIn.id },
      data: checkIn,
    })
  }
}
