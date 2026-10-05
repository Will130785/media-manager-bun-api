import type { FastifyReply } from 'fastify'
import { SESSION_TOTAL_MS } from '../constants/auth'
import type { IDb, ISession, IUser } from '../types'

const getDummyHash = async () => {
  return hashPassword(crypto.randomUUID() + crypto.randomUUID())
}

export const hashPassword = (password: string) => {
  return Bun.password.hash(password, {
    algorithm: 'argon2id',
    memoryCost: 19456,
    timeCost: 2,
  })
}

export const verifyPassword = (password: string, hash: string) => {
  return Bun.password.verify(password, hash)
}

export const hashToken = (token: string) => {
  return new Bun.CryptoHasher('sha256').update(token).digest('hex')
}

export const validateSession = async (db: IDb, token: string) => {
  const { rows } = await db.query<IUser & Pick<ISession, 'expires_at'>>(
    `SELECT u.*, s.expires_at FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.id = $1 AND s.expires_at > NOW()`,
    [hashToken(token)],
  )

  const user = rows[0]
  if (!user) {
    return null
  }

  const remaining = new Date(user.expires_at).getTime() - Date.now()
  if (remaining < SESSION_TOTAL_MS / 2) {
    await db.query(
      'UPDATE sessions SET expires_at = now() + make_interval(secs => $2) WHERE id = $1',
      [hashToken(token), SESSION_TOTAL_MS / 1000],
    )
  }

  return user
}

export const createSession = async (db: IDb, userId: string) => {
  const token = Buffer.from(
    crypto.getRandomValues(new Uint8Array(32)),
  ).toString('base64url')
  const values = [hashToken(token), userId, SESSION_TOTAL_MS / 1000]

  await db.query(
    'INSERT INTO sessions (id, user_id, expires_at) VALUES ($1, $2, now() + make_interval(secs => $3))',
    values,
  )

  return token
}

export const setSession = (reply: FastifyReply, token: string) => {
  return reply.setCookie(process.env.SESSION_COOKIE ?? '', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_TOTAL_MS / 1000,
  })
}

export const verifyCredentials = async (
  db: IDb,
  email: string,
  password: string,
) => {
  const { rows } = await db.query<IUser>('SELECT FROM users WHERE email = $1', [
    email,
  ])
  const user = rows[0]
  if (!user) {
    await verifyPassword(password, await getDummyHash())
    return null
  }
  return (await verifyPassword(password, user.password_hash)) ? user : null
}

export const revokeSession = async (db: IDb, token: string) => {
  await db.query('DELETE FROM sessions WHERE id = $1', [token])
}

export const revokeAllSessions = async (db: IDb, userId: string) => {
  await db.query('DELETE FROM sessions WHERE user_id = $1', [userId])
}

export const deleteExpiredSessions = async (db: IDb) => {
  await db.query('DELETE FROM sessions WHERE expires_at < NOW()')
}
