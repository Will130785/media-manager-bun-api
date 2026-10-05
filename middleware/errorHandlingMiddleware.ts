import type { FastifyInstance } from 'fastify'
import { HttpError } from '../utils/errorUtils'

export const universalErrorHandler = (fastify: FastifyInstance) => {
  fastify.setErrorHandler((error, request, reply) => {
    if (error instanceof HttpError) {
      return reply
        .code(error.statusCode)
        .send({ error: error.message, fields: error.fields })
    }
    request.log.error(error)
    return reply.status(500).send({ error: 'Something went wrong' })
  })
}
