import { config } from 'dotenv'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    env: {
      ...config().parsed,
      ...config({ path: './.env.test' }).parsed,
    },
  },
  plugins: [tsconfigPaths()],
})
