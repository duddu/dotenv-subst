import { Argument, Option } from '@commander-js/extra-typings';

import { defaultOptions } from '../../shared/options.js';

export const config = {
  args: {
    source: new Argument(
      '<source...>',
      'path to the source file(s) containing variable placeholders for interpolation',
    ),
  },
  opts: {
    output: new Option(
      '-o, --output <path>',
      '(only valid for single source file) optional output file path - defaults to in-place interpolation',
    ),
    envFile: new Option(
      '-f, --env-file <paths...>',
      'path(s) to your env file(s) (default: []) - forwarded directly to dotenvx',
    ),
    ignoreUnsetVars: new Option(
      '--ignore-unset-vars',
      'do not abort if source file(s) contain variables not defined in env file(s)',
    ),
    encoding: new Option(
      '--encoding <name>',
      `encoding of your source and env file(s) (default: '${defaultOptions.encoding}') - forwarded to dotenvx`,
    ),
    envKeysFile: new Option(
      '--env-keys-file <path>',
      'path to your .env.keys file (default: same path as your env file) - forwarded directly to dotenvx',
    ),
    convention: new Option(
      '--convention <name>',
      "load a .env convention (available conventions: ['nextjs', 'flow']) - forwarded directly to dotenvx",
    ),
    verbose: new Option(
      '-v, --verbose',
      'sets log level to verbose - forwarded to dotenvx',
    ),
    quiet: new Option(
      '-q, --quiet',
      'sets log level to error - forwarded to dotenvx',
    ),
  },
};

export const helpText = {
  afterAll:
    '\nMore info and usage examples available here: https://github.com/duddu/dotenv-subst?tab=readme-ov-file#-cli-usage',
};
