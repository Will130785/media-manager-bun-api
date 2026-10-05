import { Pool } from '@neondatabase/serverless'

export const createPool = (connectionString: string): Pool => {
  return new Pool({ connectionString, max: 10, idleTimeoutMillis: 30_000 })
}

export const isUniqueViolation = (err: unknown) => {
  return (
    typeof err === 'object' &&
    err !== null &&
    (err as { code: string }).code === '23505'
  )
}
