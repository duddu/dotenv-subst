import { createHash } from 'node:crypto';
import { resolve } from 'node:path';

interface E2eTestConfigConstructorParam {
  /**
   * The full command sample to test.
   */
  cmd: string;
  /**
   * Representation of any input and output files
   * associated with this test, as maps of `key:value`
   * pairs (where `key` is the file path and `value`
   * its content).
   */
  files: E2eTestFilesSetup<Record<string, string>>;
}

interface E2eTestFilesSetup<T> {
  /**
   * All the initial file(s) required to run the test,
   * including both source and .env/properties files.
   * Will be used to prepare the initial filesystem
   * state before starting the test.
   */
  readonly input: T;
  /**
   * The new file(s) this test will generate (or the
   * same source file(s) with replaced content). Will
   * be used as expected match to compare against the
   * output of the command tested.
   */
  readonly output: T;
}

interface E2eTestFileNormalizedSetup {
  readonly path: string;
  readonly content: string;
}

/**
 * Setup object for e2e test cases.
 */
export class E2eTestConfig {
  public readonly displayCmd: string;
  public readonly cmdArgv: string[];
  public readonly files: E2eTestFilesSetup<E2eTestFileNormalizedSetup[]>;
  public readonly root: string;
  public readonly hash: string;
  private resolvedCmd: string;

  constructor({ cmd, files }: E2eTestConfigConstructorParam) {
    this.displayCmd = cmd.trim();
    this.resolvedCmd = this.displayCmd;
    this.hash = this.getTestHash(this.resolvedCmd);
    this.root = this.resolveTestRoot(this.hash);
    this.files = {
      input: this.normalizeTestFiles(files.input),
      output: this.normalizeTestFiles(files.output),
    };
    this.cmdArgv = this.parseTestCmdArgv(this.resolvedCmd);
  }

  private getTestHash(cmd: string): string {
    return createHash('md5').update(cmd).digest('hex');
  }

  private resolveTestRoot(hash: string): string {
    return resolve('tmp', 'e2e', hash);
  }

  private normalizeTestFiles(
    files: Record<string, string>,
  ): E2eTestFileNormalizedSetup[] {
    return Object.keys(files).map<E2eTestFileNormalizedSetup>((path) => {
      const relPath = path.replace(/^\/+/, '');
      const absPath = resolve(this.root, relPath);
      const relPathEsc = relPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      this.resolvedCmd = this.resolvedCmd.replace(
        RegExp(
          `(?<!${this.root}/)${relPathEsc}|(?<!${this.root})/${relPathEsc}`,
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
