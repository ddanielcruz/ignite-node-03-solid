import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

import { CreateGymService } from './create-gym-service'

let sut: CreateGymService
let gymsRepo: InMemoryGymsRepository

describe('CreateGymService', () => {
  beforeEach(() => {
    gymsRepo = new InMemoryGymsRepository()
    sut = new CreateGymService(gymsRepo)
  })

  it('should create a new gym', async () => {
    const { gym } = await sut.execute({
      name: 'Academia Teste',
      description: 'Academia de teste',
      phone: '123456789',
      latitude: 0,
      longitude: 0,
    })

    expect(gym.id).toBeTruthy()
    expect(gymsRepo.gyms[0]).toEqual(gym)
  })
})
