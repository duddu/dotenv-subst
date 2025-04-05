import { resolve } from 'node:path';
import { describe, expect, it, vi } from 'vitest';

const packageJson = Object.freeze(
  await vi.importActual<typeof import('../../package.json')>(
    resolve('package.json'),
  ),
);

describe('npm package json', () => {
  it('main', () => {
    expect(packageJson.main).toBe('dist/main.js');
  });

  it('types', () => {
    expect(packageJson.types).toBe('dist/main.d.ts');
  });

  it('bin', () => {
    const cliBin = 'dist/cli/dotenv-subst.js';

    expect(packageJson.bin).toStrictEqual({
      'dotenv-subst': cliBin,
      dotenvsubst: cliBin,
    });
  });
});
