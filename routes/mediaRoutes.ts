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
  fastify.get('/get-music-by-user', getMusicByUser)
  fastify.get('/get-music-item', getMusicItem)
  fastify.post('/create-music-item', createMusicItem)
  fastify.patch('/update-music-item', updateMusicItem)
  fastify.delete('/delete-music-item', deleteMusicItem)
  fastify.get('/get-movies-by-user', getMovieByUser)
  fastify.get('/get-movie-item', getMovieItem)
  fastify.post('/create-movie-item', createMovieItem)
  fastify.patch('/update-movie-item', updateMovieItem)
  fastify.delete('/delete-movie-item', deleteMovieItem)
  fastify.get('/get-games-by-user', getGamesByUser)
  fastify.get('/get-game-item', getGameItem)
  fastify.post('/create-game-item', createGameItem)
  fastify.patch('/update-game-item', updateGameItem)
  fastify.delete('/delete-game-item', deleteGameItem)
  fastify.get('/get-books-by-user', getBooksByUser)
  fastify.get('/get-book-item', getBookItem)
  fastify.post('/create-book-item', createBookItem)
  fastify.patch('/update-book-item', updateBookItem)
  fastify.delete('/delete-book-item', deleteBookItem)
}
