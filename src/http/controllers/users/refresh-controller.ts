import { FastifyReply, FastifyRequest } from 'fastify'

export async function refreshController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    await request.jwtVerify({ onlyCookie: true })
  } catch {
    return reply.status(401).send({ message: 'Unauthorized.' })
  }

  const { sub, role } = request.user
  const accessToken = await reply.jwtSign({ role }, { sign: { sub } })
  const refreshToken = await reply.jwtSign(
    { role },
    { sign: { sub, expiresIn: '7d' } },
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    })
    .send({ token: accessToken })
}
