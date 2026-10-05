import type { FastifyInstance } from 'fastify'
import { validateSession } from '../utils/authUtils'

export const validateSessionPreHandler = async (fastify: FastifyInstance) => {
  fastify.addHook('preHandler', async (request) => {
    const token = request.cookies[process.env.SESSION_COOKIE ?? '']
    request.user = token
      ? await validateSession(request.server.db, token)
      : null
  })
}
