import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

import { FetchUserCheckInsHistoryService } from './fetch-user-check-ins-history-service'

let sut: FetchUserCheckInsHistoryService
let checkInRepository: InMemoryCheckInsRepository

describe('FetchUserCheckInsHistoryService', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryService(checkInRepository)
  })

  it('should be able to fetch check-in history', async () => {
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
      userId: 'user-2',
      gymId: 'gym-1',
      validatedAt: new Date(),
    })

    const { checkIns } = await sut.execute({ userId: 'user-1' })
    expect(checkIns).toHaveLength(2)
    expect(checkIns).toMatchObject([
      { id: checkInRepository.checkIns[0].id, gymId: 'gym-1' },
      { id: checkInRepository.checkIns[1].id, gymId: 'gym-2' },
    ])
  })

  it('should be able to fetch paginated check-in history', async () => {
    for (let index = 0; index < 22; index++) {
      await checkInRepository.create({
        userId: 'user-1',
        gymId: `gym-${index}`,
        validatedAt: new Date(),
      })
    }

    const { checkIns } = await sut.execute({ userId: 'user-1', page: 2 })
    expect(checkIns).toHaveLength(2)
  })
})
