import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3333),
  PASSWORD_SALT_ROUNDS: z.coerce.number().default(12),
  JWT_SECRET: z.string(),
})

export type Env = z.infer<typeof envSchema>

export const env: Readonly<Env> = envSchema.parse(process.env)

export const isDev = env.NODE_ENV === 'development'
export const isProd = env.NODE_ENV === 'production'
