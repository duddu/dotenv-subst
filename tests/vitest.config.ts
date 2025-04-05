import { env } from 'node:process';
import {
  configDefaults,
  coverageConfigDefaults,
  defineConfig,
} from 'vitest/config';

export default defineConfig({
  clearScreen: false,
  test: {
    coverage: {
      exclude: [...coverageConfigDefaults.exclude, 'dist/**/*'],
      reporter: [...coverageConfigDefaults.reporter, 'lcovonly'],
      include: ['src/**/*'],
      provider: 'v8',
    },
    exclude: [...configDefaults.exclude, 'dist/**/*'],
    reporters: ['verbose', ...(env.GITHUB_ACTIONS ? ['github-actions'] : [])],
    slowTestThreshold: 400,
    watch: false,
  },
});
