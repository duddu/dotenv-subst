import { logger } from '../shared/logger.js';
import {
  getParsedOptions,
  type DotenvSubstOptions,
} from '../shared/options.js';
import { getDotenvParseOutput } from './helpers/dotenv.js';
import {
  getFileContent,
  getWritablePath,
  writeFileContent,
} from './helpers/filesystem.js';
import { getInterpolatedContent } from './helpers/interpolate.js';

/**
 * Descriptor for an interpolation result.
 */
export interface DotenvSubstOutput {
  /**
   * Path to the generated file, or the source file if the interpolation was performed in-place.
   */
  outputPath: string;
  /**
   * Result of the content interpolation. Unless the {@linkcode DotenvSubstOptions.noWrite noWrite}
   * option is enabled, the interpolated content will written to file at {@linkcode outputPath}.
   */
  interpolatedContent: string;
}

/**
 * Library entry point function: performs interpolation based on the {@linkcode DotenvSubstOptions}
 * options provided.
 *
 * @throws {DotenvSubstError}
 */
export default async function dotenvSubst(
  options: DotenvSubstOptions,
): Promise<DotenvSubstOutput[]> {
  const {
    envFile,
    source,
    output,
    ignoreUnsetVars,
    noWrite,
    encoding,
    envKeysFile,
    DOTENV_KEY,
    convention,
    quiet,
    verbose,
  } = getParsedOptions(options);

  logger.configureLevel({ quiet, verbose });

  const dotenvParseOutput = getDotenvParseOutput({
    path: envFile,
    encoding,
    envKeysFile,
    DOTENV_KEY,
    convention,
    quiet,
    verbose,
  });

  const outputs: DotenvSubstOutput[] = await Promise.all(
    source.map(async (sourcePath) => {
      const sourceContent = await getFileContent(sourcePath, { encoding });
      const interpolatedContent = getInterpolatedContent(
        sourceContent,
        dotenvParseOutput,
        { ignoreUnsetVars },
      );
      const outputPath = await getWritablePath(
        (source.length === 1 && output) || sourcePath,
      );
      return { outputPath, interpolatedContent };
    }),
  );

  if (noWrite === false) {
    await Promise.all(
      outputs.map(({ outputPath, interpolatedContent }) =>
        writeFileContent(outputPath, interpolatedContent, { encoding }),
      ),
    );
  }

  return outputs.map((output) => output);
}
