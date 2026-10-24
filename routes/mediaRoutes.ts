import type { FastifyInstance } from 'fastify'
import {
  createBookItem,
  createGameItem,
  createMovieItem,
  createMusicItem,
  deleteBookItem,
  deleteGameItem,
  deleteMovieItem,
  deleteMusicItem,
  getBookItem,
  getBooksByUser,
  getGameItem,
  getGamesByUser,
  getMovieByUser,
  getMovieItem,
  getMusicByUser,
  getMusicItem,
  updateBookItem,
  updateGameItem,
  updateMovieItem,
  updateMusicItem,
} from '../controllers/mediaControllers'

export const mediaRoutes = (fastify: FastifyInstance) => {
  fastify.post('/get-music-by-user', getMusicByUser)
  fastify.get('/get-music-item/:id', getMusicItem)
  fastify.post('/create-music-item', createMusicItem)
  fastify.patch('/update-music-item/:id', updateMusicItem)
  fastify.delete('/delete-music-item/:id', deleteMusicItem)
  fastify.post('/get-movies-by-user', getMovieByUser)
  fastify.get('/get-movie-item/:id', getMovieItem)
  fastify.post('/create-movie-item', createMovieItem)
  fastify.patch('/update-movie-item/:id', updateMovieItem)
  fastify.delete('/delete-movie-item/:id', deleteMovieItem)
  fastify.post('/get-games-by-user', getGamesByUser)
  fastify.get('/get-game-item/:id', getGameItem)
  fastify.post('/create-game-item', createGameItem)
  fastify.patch('/update-game-item/:id', updateGameItem)
  fastify.delete('/delete-game-item/:id', deleteGameItem)
  fastify.post('/get-books-by-user', getBooksByUser)
  fastify.get('/get-book-item/:id', getBookItem)
  fastify.post('/create-book-item', createBookItem)
  fastify.patch('/update-book-item/:id', updateBookItem)
  fastify.delete('/delete-book-item/:id', deleteBookItem)
}
