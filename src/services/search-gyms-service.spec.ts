import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

import { SearchGymsService } from './search-gyms-service'

let sut: SearchGymsService
let gymsRepo: InMemoryGymsRepository

describe('SearchGymsService', () => {
  beforeEach(() => {
    gymsRepo = new InMemoryGymsRepository()
    sut = new SearchGymsService(gymsRepo)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepo.create({ name: 'TypeScript Gym', latitude: 0, longitude: 0 })
    await gymsRepo.create({ name: 'JavaScript Gym', latitude: 0, longitude: 0 })
    await gymsRepo.create({ name: 'Java Gym', latitude: 0, longitude: 0 })

    const { gyms } = await sut.execute({ query: 'script', page: 1 })

    expect(gyms).toHaveLength(2)
    expect(gyms).toMatchObject([
      { id: gymsRepo.gyms[0].id, name: 'TypeScript Gym' },
      { id: gymsRepo.gyms[1].id, name: 'JavaScript Gym' },
    ])
  })

  it('should be able to search for gyms with pagination', async () => {
    for (let index = 0; index < 22; index++) {
      await gymsRepo.create({ name: `Gym ${index}`, latitude: 0, longitude: 0 })
    }

    const { gyms } = await sut.execute({ query: 'gym', page: 2 })

    expect(gyms).toHaveLength(2)
  })
})
