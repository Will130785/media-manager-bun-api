import Fastify from 'fastify'
import cors from '@fastify/cors'
import cookie from '@fastify/cookie'
import { authRoutes } from '../routes/authRoutes'
import { universalErrorHandler } from '../middleware/errorHandlingMiddleware'
import type { IDb } from '../types'
import { validateSessionPreHandler } from '../middleware/authMiddleware'

export default async (db: IDb) => {
  const fastify = Fastify({
    logger: true,
  })

  await fastify.register(cors, {
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  })

  await fastify.register(cookie)

  fastify.register(authRoutes, {
    prefix: '/media-manager-api',
  })

  universalErrorHandler(fastify)
  validateSessionPreHandler(fastify)

  fastify.decorateRequest('user', null)
  fastify.decorate('db', db)

  return fastify
}
