import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { e2eFixtures } from './e2e-fixtures.js';

const argvGetterMock = vi.fn();

vi.mock('node:process', async (importOriginal) => {
  const original: NodeJS.Process = await importOriginal();
  return {
    ...original,
    setUncaughtExceptionCaptureCallback: vi.fn(),
    get argv(): string[] {
      return [...original.argv, ...argvGetterMock()];
    },
  };
});

describe('cli', async () => {
  e2eFixtures.map((config) => {
    describe(`${config.testName}`, () => {
      beforeAll(async () => {
        await rm(config.root, { recursive: true, force: true });

        await Promise.all(
          config.files.input.map(async ({ path, content }) => {
            await mkdir(dirname(path), { recursive: true });
            await writeFile(path, content, { flush: true });
          }),
        );
      });

      beforeEach(async () => {
        vi.resetAllMocks();
        vi.mocked(argvGetterMock).mockReturnValue(config.cmdArgv);

        const invalidationToken = config.hash + vi.getRealSystemTime();
        await vi.importActual(
          `../../src/cli/dotenv-subst.js?${invalidationToken}`,
        );
      });

      it('should write to file', async () => {
        await Promise.all(
          config.files.output.map(async ({ path, content }) => {
            let outputContent: Buffer;
            try {
              outputContent = await readFile(path);
            } catch (e) {
              console.error(e);
              expect.fail(`expected output file not found at '${path}'`);
            }
            expect(outputContent.toString()).toBe(content);
          }),
        );
      });
    });
  });
});
