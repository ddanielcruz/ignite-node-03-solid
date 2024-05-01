import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

import { FetchNearbyGymsService } from './fetch-nearby-gyms-service'

let sut: FetchNearbyGymsService
let gymsRepo: InMemoryGymsRepository

describe('FetchNearbyGymsService', () => {
  beforeEach(() => {
    gymsRepo = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsService(gymsRepo)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepo.create({
      name: 'Gym 1',
      latitude: -30.0270561,
      longitude: -51.1895766,
    })
    await gymsRepo.create({
      name: 'Gym 2',
      latitude: -30.0270561,
      longitude: -51.1895766,
    })
    await gymsRepo.create({ name: 'Gym 3', latitude: 0, longitude: 0 })

    const { gyms } = await sut.execute({
      userLatitude: -30.0268611,
      userLongitude: -51.1896226,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toMatchObject([
      { id: gymsRepo.gyms[0].id, name: 'Gym 1' },
      { id: gymsRepo.gyms[1].id, name: 'Gym 2' },
    ])
  })
})
