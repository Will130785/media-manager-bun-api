import { z } from 'zod'
import { registerUserSchema, loginUserSchema } from '../schemas/authSchemas'

export interface IDb {
  query<T = Record<string, unknown>>(
    text: string,
    params?: unknown[],
  ): Promise<{ rows: T[] }>
}

export type registerUserPayload = z.infer<typeof registerUserSchema>
export type loginUserPayload = z.infer<typeof loginUserSchema>

export interface ISession {
  id: string
  user_id: string
  expires_at: Date
}

export interface IUser {
  id: string
  first_name: string
  last_name: string
  email: string
  password_hash: string
  created_at: Date
  updated_at: Date
}
