import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { getE2eFixtures } from './e2e-fixtures.js';

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
  (await getE2eFixtures()).map((fixture) => {
    describe(`${fixture.name}`, () => {
      beforeAll(async () => {
        await rm(fixture.config.root, { recursive: true, force: true });

        await Promise.all(
          fixture.config.files.input.map(async ({ path, content }) => {
            await mkdir(dirname(path), { recursive: true });
            await writeFile(path, content, { flush: true });
          }),
        );
      });

      beforeEach(async () => {
        vi.resetAllMocks();
        vi.mocked(argvGetterMock).mockReturnValue(fixture.config.cmdArgv);

        try {
          const invalidationToken =
            fixture.config.hash + vi.getRealSystemTime();
          await vi.importActual(
            `../../src/cli/dotenv-subst.js?${invalidationToken}`,
          );
        } catch (e) {
          console.error(e);
          expect.fail('failed to import cli executable module');
        }
      });

      it('should write to file', async () => {
        await Promise.all(
          fixture.config.files.output.map(async ({ path, content }) => {
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
