import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import type { ConfigEnv, UserConfig } from 'vite'

import viteConfig from './vite.config'

export default defineConfig((env: ConfigEnv) => {
  const resolved: UserConfig =
    typeof viteConfig === 'function'
      ? (viteConfig as (e: ConfigEnv) => UserConfig)(env)
      : (viteConfig as UserConfig)
  return mergeConfig(resolved, {
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  })
})
