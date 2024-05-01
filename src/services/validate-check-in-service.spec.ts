import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

import { LateCheckInValidationError } from './errors/late-check-in-validation-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { ValidateCheckInService } from './validate-check-in-service'

let sut: ValidateCheckInService
let checkInsRepository: InMemoryCheckInsRepository

describe('ValidateCheckInService', () => {
  beforeAll(() => {
    vi.useFakeTimers()
  })

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInService(checkInsRepository)
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const checkIn = await checkInsRepository.create({
      gymId: 'gym-id',
      userId: 'user-id',
    })

    const { checkIn: validatedCheckIn } = await sut.execute({
      userId: checkIn.userId,
      checkInId: checkIn.id,
    })

    expect(validatedCheckIn).toEqual({
      ...checkIn,
      validatedAt: expect.any(Date),
    })
    expect(checkInsRepository.checkIns).toHaveLength(1)
  })

  it('should not be able to validate an inexistent check-in', async () => {
    const promise = sut.execute({
      userId: 'any-user-id',
      checkInId: 'any-check-in-id',
    })

    await expect(promise).rejects.toThrow(ResourceNotFoundError)
  })

  it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date('2024-01-01T12:00:00'))
    const checkIn = await checkInsRepository.create({
      gymId: 'gym-id',
      userId: 'user-id',
    })

    const TWENTY_MINUTES_IN_MS = 20 * 60 * 1000
    vi.advanceTimersByTime(TWENTY_MINUTES_IN_MS + 1) // 20 minutes and 1 millisecond

    const promise = sut.execute({
      userId: checkIn.userId,
      checkInId: checkIn.id,
    })

    await expect(promise).rejects.toThrow(LateCheckInValidationError)
  })
})
