import type { FastifyInstance } from 'fastify'
import {
  loginUser,
  logoutUser,
  registerUser,
  validateUserSession,
} from '../controllers/authControllers'

export const authRoutes = (fastify: FastifyInstance) => {
  fastify.post('/register-user', registerUser)
  fastify.post('/login-user', loginUser)
  fastify.get('/validate-user-session', validateUserSession)
  fastify.delete('/logout-user', logoutUser)
}
