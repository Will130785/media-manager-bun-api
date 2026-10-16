import Fastify from 'fastify'
import cors from '@fastify/cors'
import cookie from '@fastify/cookie'
import { authRoutes } from '../routes/authRoutes'
import { universalErrorHandler } from '../middleware/errorHandlingMiddleware'
import type { IAppOptions, IDb } from '../types'
import { validateSessionPreHandler } from '../middleware/authMiddleware'
import { mediaRoutes } from '../routes/mediaRoutes'

export default async (db: IDb, appOptions: IAppOptions) => {
  const fastify = Fastify({
    logger: appOptions.logger,
  })

  await fastify.register(cors, {
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    origin: appOptions.origin,
    credentials: true,
    allowedHeaders: ['Content-Type'],
  })

  await fastify.register(cookie)

  fastify.register(authRoutes, {
    prefix: '/media-manager-api',
  })
  fastify.register(mediaRoutes, {
    prefix: '/media-manager-api',
  })

  universalErrorHandler(fastify)
  validateSessionPreHandler(fastify)

  fastify.decorateRequest('user', null)
  fastify.decorate('db', db)

  return fastify
}
