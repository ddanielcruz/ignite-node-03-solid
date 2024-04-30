import { GymsRepository } from '@/repositories/gyms-repository'

type CreateGymRequest = {
  name: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

export class CreateGymService {
  constructor(private readonly gymsRepository: GymsRepository) {}

  async execute({
    name,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymRequest) {
    const gym = await this.gymsRepository.create({
      name,
      description,
      phone,
      latitude,
      longitude,
    })

    return { gym }
  }
}
