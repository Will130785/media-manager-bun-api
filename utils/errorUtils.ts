import type { z } from 'zod'

export class HttpError extends Error {
  constructor(
    readonly statusCode: number,
    message: string,
    readonly fields?: Record<string, string>,
  ) {
    super(message)
  }
}

export const fieldErrors = (error: z.ZodError) => {
  const output: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? 'form')
    output[key] ??= issue.message
  }

  return output
}
