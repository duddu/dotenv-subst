import { readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

import type { E2eTestConfig } from './e2e-config.js';

interface E2eTestFixture {
  readonly name: string;
  readonly config: E2eTestConfig;
}

/**
 * Dynamically imports all e2e test config fixtures by filename.
 */
export async function getE2eFixtures(): Promise<E2eTestFixture[]> {
  const dirPath = resolve(import.meta.dirname, './fixtures');
  const filenames = await readdir(dirPath);
  return await Promise.all(
    filenames
      .filter((filename) => filename.endsWith('.fixture.ts'))
      .map(async (filename) => {
        const fileModule = await import(
          resolve(dirPath, filename.replace(/\.ts$/, '.js'))
        );
        return {
          name: filename.replace(/\.\S+$/, '').replaceAll('_', ' '),
          config: fileModule.default,
        };
      }),
  );
}

/**
 * Statically import all fixtures modules to ensure that any changes
 * to them during watch mode will trigger a rerun of the suite that
 * imported this file (and *only* of that specific suite).
 */
import './fixtures/ignoring_unset_variable_errors.fixture.js';
import './fixtures/using_multiple_env_files.fixture.js';
import './fixtures/using_multiple_source_files.fixture.js';
import './fixtures/using_specified_encoding.fixture.js';
import './fixtures/writing_to_original_source_file.fixture.js';
import './fixtures/writing_to_specified_output_file.fixture.js';
