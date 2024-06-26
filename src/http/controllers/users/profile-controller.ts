import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetUserProfileService } from '@/services/factories/make-get-user-profile-service'

export async function profileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserProfile = makeGetUserProfileService()
  const { user } = await getUserProfile.execute({ userId: request.user.sub })

  return reply.send({
    user: {
      ...user,
      passwordHash: undefined,
    },
  })
}
