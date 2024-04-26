import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3333),
})

export type Env = z.infer<typeof envSchema>

export const env: Readonly<Env> = envSchema.parse(process.env)