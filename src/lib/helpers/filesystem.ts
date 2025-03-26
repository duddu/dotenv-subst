import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

import { throwError } from '../../shared/errors.js';
import type { DotenvSubstOptions } from '../../shared/options.js';
import type { PickRequired } from '../../shared/utils.js';

export async function getFileContent(
  filePath: string,
  { encoding }: PickRequired<DotenvSubstOptions, 'encoding'>,
): Promise<string> {
  try {
    return await readFile(filePath, { encoding });
  } catch (cause) {
    throwError(
      'FS_OPERATION_FAILED',
      `failed to read contents of file at '${filePath}'`,
      cause,
    );
  }
}

export async function getWritablePath(filePath: string): Promise<string> {
  let outputPath: string;
  let outputPathDir: string;
  try {
    outputPath = resolve(filePath);
    outputPathDir = dirname(outputPath);
  } catch (cause) {
    throwError(
      'FS_OPERATION_FAILED',
      `failed to resolve output path for file '${filePath}'`,
      cause,
    );
  }
  try {
    await mkdir(outputPathDir, { recursive: true });
  } catch (cause) {
    throwError(
      'FS_OPERATION_FAILED',
      `failed to prepare the dir '${outputPathDir}' for writing`,
      cause,
    );
  }
  return outputPath;
}

export async function writeFileContent(
  filePath: string,
  content: string,
  { encoding }: PickRequired<DotenvSubstOptions, 'encoding'>,
): Promise<void> {
  try {
    return await writeFile(filePath, content, { encoding, flush: true });
  } catch (cause) {
    throwError(
      'FS_OPERATION_FAILED',
      `failed to write content to file at '${filePath}'`,
      cause,
    );
  }
}
