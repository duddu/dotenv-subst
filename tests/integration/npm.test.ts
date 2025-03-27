import { resolve } from 'node:path';
import { describe, expect, it, vi } from 'vitest';

import { runNodeExecutable } from './integration-utils.js';

const packageJson = Object.freeze(
  await vi.importActual<typeof import('../../package.json')>(
    resolve('package.json'),
  ),
);

describe('npm package', () => {
  describe('main module', () => {
    it('should point to dist entry point', async () => {
      const [packageMain, resolvedMain] = await Promise.all([
        vi.importActual(resolve(packageJson.main)),
        vi.importActual('../../dist/main.js'),
      ]);

      expect(packageMain).toBe(resolvedMain);
    });
  });

  describe('bin executables', () => {
    Object.entries(packageJson.bin).map(([binName, binPath]) => {
      describe(`${binName}`, () => {
        it('should point to dist cli executable', async () => {
          const stdout = await runNodeExecutable(binPath, ['--version']);

          expect(stdout).toMatch(packageJson.version);
        });
      });
    });
  });
});
