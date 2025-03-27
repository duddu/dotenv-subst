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
      '(for single source file only) optional output file path - defaults to in-place interpolation',
    ),
    envFile: new Option(
      '-f, --env-file <paths...>',
      "path(s) to your env file(s) (default: []) - see dotenvx config path option",
    ),
    ignoreUnsetVars: new Option(
      '--ignore-unset-vars',
      'do not abort if the source file(s) contain any variables not defined in the env file(s)',
    ),
    encoding: new Option(
      '--encoding <name>',
      `encoding of your source and env file(s) (default: '${defaultOptions.encoding}') - see dotenvx config encoding option`,
    ),
    envKeysFile: new Option(
      '--env-keys-file <path>',
      "path to your .env.keys file (default: same path as your env file) - see dotenvx config envKeysFile option",
    ),
    convention: new Option(
      '--convention <name>',
      "load a .env convention (available conventions: ['nextjs', 'flow']) - see dotenvx config convention option",
    ),
    verbose: new Option(
      '-v, --verbose',
      "sets log level to verbose - see dotenvx config verbose option",
    ),
    quiet: new Option(
      '-q, --quiet',
      "sets log level to error - see dotenvx config quiet option",
    ),
  },
};

export const helpText = {
  // @TODO link to examples and docs
  afterAll: '',
};
