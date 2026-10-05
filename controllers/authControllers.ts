import type { FastifyReply, FastifyRequest } from 'fastify'
import { loginUserSchema, registerUserSchema } from '../schemas/authSchemas'
import { HttpError } from '../utils/errorUtils'
import {
  createSession,
  hashPassword,
  setSession,
  verifyCredentials,
} from '../utils/authUtils'
import { isUniqueViolation } from '../app/db'
import type { IUser } from '../types'
import { publicUser } from '../utils/generalUtils'

export const registerUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const parsedBody = registerUserSchema.safeParse(request.body)
  if (!parsedBody.success) {
    throw new HttpError(400, 'Invalid data', parsedBody.data)
  }

  const values = [
    crypto.randomUUID(),
    parsedBody.data.firstName,
    parsedBody.data.lastName,
    parsedBody.data.email.toLowerCase(),
    await hashPassword(parsedBody.data.password),
  ]

  try {
    const { rows } = await request.server.db.query<IUser>(
      'INSERT INTO users (id, first_name, last_name, email, hashed_password) VALUES ($1, $2, $3, $4, $5)',
      values,
    )

    const user = rows[0]
    if (!user) {
      throw new HttpError(409, 'Unable to create user', {
        error: 'Unable to create user',
      })
    }

    const token = await createSession(request.server.db, user.id)
    return setSession(reply, token).code(201).send(publicUser(user))
  } catch (err) {
    if (isUniqueViolation(err)) {
      return null
    }
    throw err
  }
}

export const loginUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const parsedBody = loginUserSchema.safeParse(request.body)
  if (!parsedBody.success) {
    throw new HttpError(400, 'Invalid data', parsedBody.data)
  }

  const user = await verifyCredentials(
    request.server.db,
    parsedBody.data.email,
    parsedBody.data.password,
  )

  if (!user) {
    throw new HttpError(401, 'Invalid email or password')
  }

  const token = await createSession(request.server.db, user.id)

  return setSession(reply, token).send(publicUser(user))
}

export const validateUserSession = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  if (!request.user) {
    return reply.status(400).send({ message: 'No valid session' })
  }
  return reply.status(200).send(publicUser(request.user))
}

export const validateUserRequest = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  if (!request.user) {
    throw new HttpError(403, 'Forbidden')
  }
}

export const logoutUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  return reply.status(200).send({ success: true })
}
