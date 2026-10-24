import buildApp from './app/buildApp'
import { createPool } from './app/db'

const pool = createPool(process.env.DATABASE_URL ?? '')

const app = await buildApp(pool, {
  logger: true,
  origin: process.env.ORIGIN ?? '',
})

app.listen({
  port: Number(process.env.PORT),
  host: '0.0.0.0',
})
