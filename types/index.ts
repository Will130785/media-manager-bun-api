import { z } from 'zod'
import { registerUserSchema, loginUserSchema } from '../schemas/authSchemas'
import {
  musicSchema,
  movieSchema,
  gameSchema,
  bookSchema,
} from '../schemas/mediaSchemas'

export interface IDb {
  query<T = Record<string, unknown>>(
    text: string,
    params?: unknown[],
  ): Promise<{ rows: T[] }>
}

export interface IAppOptions {
  logger: boolean
  origin: string
}

export type registerUserPayload = z.infer<typeof registerUserSchema>
export type loginUserPayload = z.infer<typeof loginUserSchema>
export type musicPayload = z.infer<typeof musicSchema>
export type moviePayload = z.infer<typeof movieSchema>
export type gamePayload = z.infer<typeof gameSchema>
export type bookPayload = z.infer<typeof bookSchema>

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
  hashed_password: string
  created_at: Date
  updated_at: Date
}

export interface IMusic {
  id: string
  artist: string
  title: string
  type: string
  date_of_release: string
  barcode: string
  created_at: string
  updated_at: string
  user_id: string
}

export interface IMovie {
  id: string
  director: string
  title: string
  type: string
  date_of_release: string
  barcode: string
  created_at: string
  updated_at: string
  user_id: string
}

export interface IGame {
  id: string
  developer: string
  title: string
  platform: string
  date_of_release: string
  barcode: string
  created_at: string
  updated_at: string
  user_id: string
}

export interface IBook {
  id: string
  author: string
  title: string
  date_of_release: string
  barcode: string
  created_at: string
  updated_at: string
  user_id: string
}
