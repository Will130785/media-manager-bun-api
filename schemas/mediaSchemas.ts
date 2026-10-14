import { z } from 'zod'

export const musicSchema = z.object({
  id: z.string(),
  artist: z.string(),
  title: z.string(),
  type: z.string(),
  dateOfRelease: z.date(),
  barcode: z.string(),
})

export const movieSchema = z.object({
  id: z.string(),
  director: z.string(),
  title: z.string(),
  type: z.string(),
  dateOfRelease: z.date(),
  barcode: z.string(),
})

export const gameSchema = z.object({
  id: z.string(),
  developer: z.string(),
  title: z.string(),
  platform: z.string(),
  dateOfRelease: z.date(),
  barcode: z.string(),
})

export const bookSchema = z.object({
  id: z.string(),
  author: z.string(),
  title: z.string(),
  dateOfRelease: z.date(),
  barcode: z.string(),
})
