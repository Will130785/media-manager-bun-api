import 'fastify'
import { IDb, IUser } from '.'

declare module 'fastify' {
  interface FastifyInstance {
    db: IDb
    requireUser: (request: FastifyInstance) => Promise<void>
  }
  interface FastifyRequest {
    user: IUser | null
  }
}
