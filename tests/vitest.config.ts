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
      include: ['src/**/*'],
      provider: 'v8',
    },
    exclude: [...configDefaults.exclude, 'dist/**/*'],
    reporters: process.env.GITHUB_ACTIONS
      ? ['verbose', 'github-actions']
      : ['verbose'],
    slowTestThreshold: 450,
    watch: false,
  },
});
