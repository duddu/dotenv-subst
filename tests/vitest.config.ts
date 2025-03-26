import {
  configDefaults,
  coverageConfigDefaults,
  defineConfig,
} from 'vitest/config';

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, 'build/**/*'],
    coverage: {
      provider: 'v8',
      exclude: [...coverageConfigDefaults.exclude, 'build/**/*'],
    },
    reporters: process.env.GITHUB_ACTIONS
      ? ['verbose', 'github-actions']
      : ['verbose'],
  },
});
