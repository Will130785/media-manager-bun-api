import type { FastifyReply, FastifyRequest } from 'fastify'
import { HttpError } from '../utils/errorUtils'
import type { IBook, IGame, IMovie, IMusic } from '../types'
import { publicMediaItems, publicMediaItem } from '../utils/generalUtils'
import {
  bookSchema,
  gameSchema,
  movieSchema,
  musicSchema,
} from '../schemas/mediaSchemas'

export const getMusicByUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const user = request.user
  if (!user) {
    throw new HttpError(400, 'No user')
  }

  const { rows } = await request.server.db.query<IMusic>(
    'SELECT * FROM music WHERE user_id = $1',
    [user.id],
  )

  return reply.status(200).send(publicMediaItems(rows))
}

export const getMusicItem = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { id } = request.params as { id: string }

  const { rows } = await request.server.db.query<IMusic>(
    'SELECT * FROM music WHERE id = $1',
    [id],
  )
  const musicItem = rows[0]
  if (!musicItem) {
    throw new HttpError(404, 'No item found')
  }

  return reply.status(200).send(publicMediaItem(musicItem))
}

export const createMusicItem = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const parsedBody = musicSchema.safeParse(request.body)
  if (!parsedBody.success) {
    throw new HttpError(400, 'Invalid data')
  }

  if (!request.user) {
    throw new HttpError(400, 'No user')
  }

  const values = [
    crypto.randomUUID(),
    parsedBody.data.artist,
    parsedBody.data.title,
    parsedBody.data.type,
    parsedBody.data.dateOfRelease,
    parsedBody.data.barcode,
    request.user.id,
  ]

  const { rows } = await request.server.db.query<IMusic>(
    'INSERT INTO music (id, artist, title, type, date_of_release, barcode, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    values,
  )
  const newMediaItem = rows[0]
  if (!newMediaItem) {
    throw new HttpError(500, 'Unable to create new media item')
  }

  return reply.status(201).send(publicMediaItem(newMediaItem))
}

export const updateMusicItem = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { id } = request.params as { id: string }

  const parsedBody = musicSchema.safeParse(request.body)

  if (!parsedBody.success) {
    throw new HttpError(400, 'Invalid data')
  }

  const values = [
    parsedBody.data.artist,
    parsedBody.data.title,
    parsedBody.data.type,
    parsedBody.data.dateOfRelease,
    parsedBody.data.barcode,
    id,
  ]

  const { rows } = await request.server.db.query<IMusic>(
    'UPDATE music SET artist = $1, title = $2, type = $3, date_of_release = $4, barcode = $5 WHERE id = $6 RETURNING *',
    values,
  )

  const updatedMediaItem = rows[0]
  if (!updatedMediaItem) {
    throw new HttpError(500, 'Error updating media item')
  }

  return reply.status(200).send(publicMediaItem(updatedMediaItem))
}

export const deleteMusicItem = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { id } = request.params as { id: string }

  await request.server.db.query('DELETE FROM music WHERE id = $1', [id])

  return reply.status(200).send({ message: 'Media item deleted' })
}

export const getMovieByUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const user = request.user
  if (!user) {
    throw new HttpError(400, 'No user')
  }

  const { rows } = await request.server.db.query<IMovie>(
    'SELECT * FROM movies WHERE user_id = $1',
    [user.id],
  )

  return reply.status(200).send(publicMediaItems(rows))
}

export const getMovieItem = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { id } = request.params as { id: string }

  const { rows } = await request.server.db.query<IMovie>(
    'SELECT * FROM movies WHERE id = $1',
    [id],
  )
  const mediaItem = rows[0]
  if (!mediaItem) {
    throw new HttpError(404, 'No item found')
  }

  return reply.status(200).send(publicMediaItem(mediaItem))
}

export const createMovieItem = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const parsedBody = movieSchema.safeParse(request.body)
  if (!parsedBody.success) {
    throw new HttpError(400, 'Invalid data')
  }

  if (!request.user) {
    throw new HttpError(400, 'No user')
  }

  const values = [
    crypto.randomUUID(),
    parsedBody.data.director,
    parsedBody.data.title,
    parsedBody.data.type,
    parsedBody.data.dateOfRelease,
    parsedBody.data.barcode,
    request.user.id,
  ]

  const { rows } = await request.server.db.query<IMusic>(
    'INSERT INTO movies (id, director, title, type, date_of_release, barcode, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    values,
  )
  const newMediaItem = rows[0]
  if (!newMediaItem) {
    throw new HttpError(500, 'Unable to create new media item')
  }

  return reply.status(201).send(publicMediaItem(newMediaItem))
}

export const updateMovieItem = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { id } = request.params as { id: string }

  const parsedBody = movieSchema.safeParse(request.body)

  if (!parsedBody.success) {
    throw new HttpError(400, 'Invalid data')
  }

  const values = [
    parsedBody.data.director,
    parsedBody.data.title,
    parsedBody.data.type,
    parsedBody.data.dateOfRelease,
    parsedBody.data.barcode,
    id,
  ]

  const { rows } = await request.server.db.query<IMusic>(
    'UPDATE movies SET director = $1, title = $2, type = $3, date_of_release = $4, barcode = $5 WHERE id = $6 RETURNING *',
    values,
  )

  const updatedMediaItem = rows[0]
  if (!updatedMediaItem) {
    throw new HttpError(500, 'Error updating media item')
  }

  return reply.status(200).send(publicMediaItem(updatedMediaItem))
}

export const deleteMovieItem = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { id } = request.params as { id: string }

  await request.server.db.query('DELETE FROM movies WHERE id = $1', [id])

  return reply.status(200).send({ message: 'Media item deleted' })
}

export const getGamesByUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const user = request.user
  if (!user) {
    throw new HttpError(400, 'No user')
  }

  const { rows } = await request.server.db.query<IGame>(
    'SELECT * FROM games WHERE user_id = $1',
    [user.id],
  )

  return reply.status(200).send(publicMediaItems(rows))
}

export const getGameItem = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { id } = request.params as { id: string }

  const { rows } = await request.server.db.query<IGame>(
    'SELECT * FROM games WHERE id = $1',
    [id],
  )
  const mediaItem = rows[0]
  if (!mediaItem) {
    throw new HttpError(404, 'No item found')
  }

  return reply.status(200).send(publicMediaItem(mediaItem))
}

export const createGameItem = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const parsedBody = gameSchema.safeParse(request.body)
  if (!parsedBody.success) {
    throw new HttpError(400, 'Invalid data')
  }

  if (!request.user) {
    throw new HttpError(400, 'No user')
  }

  const values = [
    crypto.randomUUID(),
    parsedBody.data.developer,
    parsedBody.data.title,
    parsedBody.data.platform,
    parsedBody.data.dateOfRelease,
    parsedBody.data.barcode,
    request.user.id,
  ]

  const { rows } = await request.server.db.query<IMusic>(
    'INSERT INTO games (id, developer, title, platform, date_of_release, barcode, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    values,
  )
  const newMediaItem = rows[0]
  if (!newMediaItem) {
    throw new HttpError(500, 'Unable to create new media item')
  }

  return reply.status(201).send(publicMediaItem(newMediaItem))
}

export const updateGameItem = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { id } = request.params as { id: string }

  const parsedBody = gameSchema.safeParse(request.body)

  if (!parsedBody.success) {
    throw new HttpError(400, 'Invalid data')
  }

  const values = [
    parsedBody.data.developer,
    parsedBody.data.title,
    parsedBody.data.platform,
    parsedBody.data.dateOfRelease,
    parsedBody.data.barcode,
    id,
  ]

  const { rows } = await request.server.db.query<IGame>(
    'UPDATE games SET developer = $1, title = $2, platform = $3, date_of_release = $4, barcode = $5 WHERE id = $6 RETURNING *',
    values,
  )

  const updatedMediaItem = rows[0]
  if (!updatedMediaItem) {
    throw new HttpError(500, 'Error updating media item')
  }

  return reply.status(200).send(publicMediaItem(updatedMediaItem))
}

export const deleteGameItem = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { id } = request.params as { id: string }

  await request.server.db.query('DELETE FROM games WHERE id = $1', [id])

  return reply.status(200).send({ message: 'Media item deleted' })
}

export const getBooksByUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const user = request.user
  if (!user) {
    throw new HttpError(400, 'No user')
  }

  const { rows } = await request.server.db.query<IBook>(
    'SELECT * FROM books WHERE user_id = $1',
    [user.id],
  )

  return reply.status(200).send(publicMediaItems(rows))
}

export const getBookItem = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { id } = request.params as { id: string }

  const { rows } = await request.server.db.query<IBook>(
    'SELECT * FROM books WHERE id = $1',
    [id],
  )
  const mediaItem = rows[0]
  if (!mediaItem) {
    throw new HttpError(404, 'No item found')
  }

  return reply.status(200).send(publicMediaItem(mediaItem))
}

export const createBookItem = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const parsedBody = bookSchema.safeParse(request.body)
  if (!parsedBody.success) {
    throw new HttpError(400, 'Invalid data')
  }

  if (!request.user) {
    throw new HttpError(400, 'No user')
  }

  const values = [
    crypto.randomUUID(),
    parsedBody.data.author,
    parsedBody.data.title,
    parsedBody.data.dateOfRelease,
    parsedBody.data.barcode,
    request.user.id,
  ]

  const { rows } = await request.server.db.query<IMusic>(
    'INSERT INTO books (id, author, title, date_of_release, barcode, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    values,
  )
  const newMediaItem = rows[0]
  if (!newMediaItem) {
    throw new HttpError(500, 'Unable to create new media item')
  }

  return reply.status(201).send(publicMediaItem(newMediaItem))
}

export const updateBookItem = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { id } = request.params as { id: string }

  const parsedBody = bookSchema.safeParse(request.body)

  if (!parsedBody.success) {
    throw new HttpError(400, 'Invalid data')
  }

  const values = [
    parsedBody.data.author,
    parsedBody.data.title,
    parsedBody.data.dateOfRelease,
    parsedBody.data.barcode,
    id,
  ]

  const { rows } = await request.server.db.query<IMusic>(
    'UPDATE books SET author = $1, title = $2, date_of_release = $3, barcode = $4 WHERE id = $5 RETURNING *',
    values,
  )

  const updatedMediaItem = rows[0]
  if (!updatedMediaItem) {
    throw new HttpError(500, 'Error updating media item')
  }

  return reply.status(200).send(publicMediaItem(updatedMediaItem))
}

export const deleteBookItem = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { id } = request.params as { id: string }

  await request.server.db.query('DELETE FROM books WHERE id = $1', [id])

  return reply.status(200).send({ message: 'Media item deleted' })
}
