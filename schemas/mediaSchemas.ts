import { z } from 'zod'

export const musicSchema = z.object({
  artist: z.string(),
  title: z.string(),
  type: z.string(),
  dateOfRelease: z.string(),
  barcode: z.string(),
})

export const movieSchema = z.object({
  director: z.string(),
  title: z.string(),
  type: z.string(),
  dateOfRelease: z.string(),
  barcode: z.string(),
})

export const gameSchema = z.object({
  developer: z.string(),
  title: z.string(),
  platform: z.string(),
  dateOfRelease: z.string(),
  barcode: z.string(),
})

export const bookSchema = z.object({
  author: z.string(),
  title: z.string(),
  dateOfRelease: z.string(),
  barcode: z.string(),
})
