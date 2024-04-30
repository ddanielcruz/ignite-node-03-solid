import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

import { GetUserMetricsService } from './get-user-metrics-service'

let sut: GetUserMetricsService
let checkInRepository: InMemoryCheckInsRepository

describe('GetUserMetricsService', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsService(checkInRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    await checkInRepository.create({
      userId: 'user-1',
      gymId: 'gym-1',
      validatedAt: new Date(),
    })

    await checkInRepository.create({
      userId: 'user-1',
      gymId: 'gym-2',
      validatedAt: new Date(),
    })

    await checkInRepository.create({
      userId: 'user-1',
      gymId: 'gym-3',
      validatedAt: new Date(),
    })

    await checkInRepository.create({
      userId: 'user-2',
      gymId: 'gym-3',
      validatedAt: new Date(),
    })

    const { checkInsCount } = await sut.execute({ userId: 'user-1' })
    expect(checkInsCount).toBe(3)
  })
})
