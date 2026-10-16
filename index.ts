import buildApp from './app/buildApp'
import { createPool } from './app/db'

const pool = createPool(process.env.DATABASE_URL ?? '')

const app = await buildApp(pool, {
  logger: true,
  origin: 'http://localhost:5173',
})

app.listen({
  port: Number(process.env.PORT),
})
