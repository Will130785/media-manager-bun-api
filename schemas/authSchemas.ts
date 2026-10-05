import { z } from 'zod'

export const registerUserSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.email().min(1, 'Email is required'),
    password: z.string().min(12, 'Password is required'),
    passwordConfirm: z.string().min(12, 'Confirm password is required'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords do not match',
    path: ['passwordConfirm'],
  })

export const loginUserSchema = z.object({
  email: z.email().min(1, 'Email is required'),
  password: z.string().min(12, 'Password is required'),
})
