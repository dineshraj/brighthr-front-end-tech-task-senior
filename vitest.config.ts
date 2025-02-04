/// <reference types="vitest/config" />

import { mergeConfig, defineConfig } from 'vitest/config';
import viteConfig from './vite.config';

// https://vite.dev/config/
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ['test/**/*.test.{tsx,ts}'],
      globals: true,
      restoreMocks: true,
      environment: 'happy-dom',
      setupFiles: ['./test/setup.ts']
    }
  })
);
