import { createHash } from 'node:crypto';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { cwd } from 'node:process';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

interface E2eTestConfigFile {
  readonly path: string;
  readonly content: string;
}

interface E2eTestConfigFiles<T> {
  readonly input: T;
  readonly output: T;
}

interface E2eTestConfigParams {
  cmd: string;
  files: E2eTestConfigFiles<Record<string, string>>;
}

export class E2eTestConfig {
  public readonly displayCmd: string;
  public readonly cmdArgv: string[];
  public readonly files: E2eTestConfigFiles<E2eTestConfigFile[]>;
  public readonly root: string;
  public readonly hash: string;
  private resolvedCmd: string;

  constructor({ cmd, files }: E2eTestConfigParams) {
    this.displayCmd = cmd.trim();
    this.resolvedCmd = this.displayCmd;
    this.hash = this.getTestHash(this.resolvedCmd);
    this.root = this.resolveTestRoot(this.hash);
    this.files = {
      input: this.parseTestFiles(files.input),
      output: this.parseTestFiles(files.output),
    };
    this.cmdArgv = this.parseTestCmdArgv(this.resolvedCmd);
  }

  private getTestHash(cmd: string): string {
    return createHash('md5').update(cmd).digest('hex');
  }

  private resolveTestRoot(hash: string): string {
    return resolve(cwd(), 'tmp', 'e2e', hash);
  }

  private parseTestFiles(files: Record<string, string>): E2eTestConfigFile[] {
    return Object.keys(files).map<E2eTestConfigFile>((path) => {
      const relPath = path.replace(/^\/+/, '');
      const absPath = resolve(this.root, relPath);
      this.resolvedCmd = this.resolvedCmd.replace(
        RegExp(
          `(?<!${this.root}/)${relPath}|(?<!${this.root})/${relPath}`,
          'g',
        ),
        absPath,
      );
      return {
        path: absPath,
        content: files[path],
      };
    });
  }

  private parseTestCmdArgv(cmd: string): string[] {
    return cmd
      .replace(/^dotenv-?subst/, '')
      .split(/\s+/)
      .filter((arg) => arg !== '');
  }
}

const getArgvMock = vi.fn<() => string[]>(() => []);
vi.mock('node:process', async (importOriginal) => {
  const original: NodeJS.Process = await importOriginal();
  return {
    ...original,
    get argv(): string[] {
      return [...original.argv, ...getArgvMock()];
    },
    setUncaughtExceptionCaptureCallback: vi.fn(),
  };
});

const fixturesPath = resolve(import.meta.dirname, 'fixtures');
const fixtures = await readdir(fixturesPath);

describe('cli', () => {
  fixtures.map((filename) => {
    const testName = filename.replace(/\..+$/, '').replace(/[_]/g, ' ');

    describe(`${testName}`, () => {
      let config: E2eTestConfig;

      beforeAll(async () => {
        config = (await import(resolve(fixturesPath, filename))).default;

        await Promise.all(
          config.files.input.map(async ({ path, content }) => {
            await mkdir(dirname(path), { recursive: true });
            await writeFile(path, content, { encoding: 'utf-8', flush: true });
          }),
        );
      });

      beforeEach(async () => {
        vi.resetAllMocks();
        vi.mocked(getArgvMock).mockReturnValue(config.cmdArgv);

        try {
          const cliModuleInvalidationQuery =
            config.hash + '-' + vi.getRealSystemTime();
          await vi.importActual(
            `../../src/cli/dotenv-subst.js?${cliModuleInvalidationQuery}`,
          );
        } catch (e) {
          console.error(e);
        }
      });

      it('should generated interpolated output', async () => {
        await Promise.all(
          config.files.output.map(async ({ path, content }) => {
            let outpuContent: string;
            try {
              outpuContent = await readFile(path, 'utf-8');
            } catch {
              throw new Error(`no output file readable at '${path}'`);
            }
            expect(outpuContent).toBe(content);
          }),
        );
      });
    });
  });
});
