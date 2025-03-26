import type { DotenvConfigOptions } from '@dotenvx/dotenvx';

import { throwError } from './errors.js';
import { coerceToArray, isNonEmptyString, type PickRequired } from './utils.js';

export type DotenvConfigOptionsInherited = Pick<
  DotenvConfigOptions,
  'envKeysFile' | 'DOTENV_KEY' | 'convention' | 'quiet' | 'verbose'
>;

export type DotenvSubstOptions = {
  /**
   * The path to the file(s) containing variables to interpolate.
   *
   * Each path can be absolute or relative - in which case is resolved from `process.cwd()`.
   */
  source: string | string[];
  /**
   * (Optional) When a single source file is provided, this specifies the path for the generated
   * interpolated file. If set, the source file will be left intact.
   *
   * This option and the `noWrite` one are mutually exclusive.
   *
   * By default, and always when multiple source files are provided, the content of each source file is replaced
   * with the interpolated one (i.e. files are interpolated in-place).
   *
   * @default <source>
   */
  output?: string;
  /**
   * Same as dotenvx config's {@link DotenvConfigOptions.path path} option.
   *
   * The path to the file(s) containing your variables as key=value pairs (e.g., *.env / *.properties format),
   * which will be used to interpolate the source file(s) content.
   *
   * The value provided is passed to dotenvx config as is.
   *
   * @see {@linkcode DotenvConfigOptions.path}
   */
  envFile?: DotenvConfigOptions['path'];
  /**
   * Whether to suppress errors when the source file(s) contain variables that are not defined in your env file(s).
   *
   * By default, interpolation fails at the first unset variable encountered.
   *
   * @default false
   */
  ignoreUnsetVars?: boolean;
  /**
   * Whether to skip writing the interpolated content to a file. If enabled, the library will return the
   * interpolation output without performing any write operations.
   *
   * This option and the `output` one are mutually exclusive.
   *
   * By default, the output is written to file(s).
   *
   * @default false
   */
  noWrite?: boolean;
  /**
   * The encoding of your input files (both source and variables file(s)) - same as dotenvx config's
   * {@link DotenvConfigOptions.encoding encoding} option.
   *
   * The value provided is passed to dotenvx config as is.
   *
   * @see {@linkcode DotenvConfigOptions.encoding}
   *
   * @default 'utf-8'
   */
  encoding?: BufferEncoding;
} & DotenvConfigOptionsInherited;

export const defaultOptions: Readonly<
  PickRequired<
    DotenvSubstOptions,
    'ignoreUnsetVars' | 'noWrite' | 'encoding' | 'quiet' | 'verbose'
  >
> = Object.freeze<typeof defaultOptions>({
  ignoreUnsetVars: false,
  noWrite: false,
  encoding: 'utf-8',
  quiet: false,
  verbose: false,
});

export function getParsedOptions({
  source,
  output,
  ignoreUnsetVars = defaultOptions.ignoreUnsetVars,
  noWrite = defaultOptions.noWrite,
  encoding = defaultOptions.encoding,
  quiet = defaultOptions.quiet,
  verbose = defaultOptions.verbose,
  ...options
}: DotenvSubstOptions): Readonly<
  { source: string[] } & Omit<DotenvSubstOptions, 'source'> &
    typeof defaultOptions
> {
  source = parseSourceOption(source);
  output = parseOutputOption(output, source, noWrite);
  return Object.freeze<ReturnType<typeof getParsedOptions>>({
    source,
    output,
    ignoreUnsetVars,
    noWrite,
    encoding,
    quiet,
    verbose,
    ...options,
  });
}

function parseSourceOption(value: DotenvSubstOptions['source']): string[] {
  const sources = coerceToArray(value).filter(isNonEmptyString);
  if (sources.length === 0) {
    throwError(
      'INVALID_OPTION',
      'no valid string(s) provided for the `source` option',
    );
  }
  return sources;
}

function parseOutputOption(
  value: DotenvSubstOptions['output'],
  sources: string[],
  noWrite: DotenvSubstOptions['noWrite'],
): DotenvSubstOptions['output'] {
  if (!isNonEmptyString(value)) return void 0;
  if (noWrite === true) {
    throwError(
      'INVALID_OPTION',
      "the 'noWrite' and `output` options and mutually exclusive",
    );
  }
  if (sources.length > 1) {
    throwError(
      'INVALID_OPTION',
      "the 'output' option is only allowed when a single `source` file is provided",
    );
  }
  return value;
}
