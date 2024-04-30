import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

import { CheckInRequest, CheckInService } from './check-in-service'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let sut: CheckInService
let checkInRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository

const request: CheckInRequest = {
  gymId: 'gym-id',
  userId: 'user-id',
  userLatitude: -30.0268611,
  userLongitude: -51.1896226,
}

describe('CheckInService', () => {
  beforeAll(() => {
    vi.useFakeTimers()
  })

  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInService(checkInRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-id',
      name: 'SmartFit',
      phone: null,
      description: null,
      latitude: -30.0270561,
      longitude: -51.1895766,
    })
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute(request)

    expect(checkIn).toEqual({
      id: expect.any(String),
      userId: request.userId,
      gymId: request.gymId,
      validatedAt: null,
      createdAt: expect.any(Date),
    })
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date('2024-01-01T00:00:00'))
    await sut.execute(request)

    const promise = sut.execute(request)

    await expect(promise).rejects.toThrow(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date('2024-01-01T00:00:00'))
    await sut.execute(request)

    vi.setSystemTime(new Date('2024-01-02T00:00:00'))
    await sut.execute(request)
  })

  it('should not be able to check in if the gym does not exist', async () => {
    const promise = sut.execute({ ...request, gymId: 'invalid-gym-id' })
    await expect(promise).rejects.toThrow(ResourceNotFoundError)
  })

  it('should not be able to check in if the user is more than 100m away from the gym', async () => {
    const promise = sut.execute({
      ...request,
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(promise).rejects.toThrow(MaxDistanceError)
  })
})
