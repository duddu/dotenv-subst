import {
  configDefaults,
  coverageConfigDefaults,
  defineConfig,
} from 'vitest/config';

export default defineConfig({
  clearScreen: false,
  test: {
    coverage: {
      exclude: [...coverageConfigDefaults.exclude, 'build/**/*'],
      include: ['src/**/*'],
      provider: 'v8',
    },
    exclude: [...configDefaults.exclude, 'build/**/*'],
    reporters: process.env.GITHUB_ACTIONS
      ? ['verbose', 'github-actions']
      : ['verbose'],
    watch: false,
  },
});
