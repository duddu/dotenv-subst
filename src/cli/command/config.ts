import { Argument, Option } from '@commander-js/extra-typings';

import { defaultOptions } from '../../shared/options.js';

export const config = {
  args: {
    source: new Argument(
      '<source...>',
      'path to file(s) containing variables to interpolate',
    ),
  },
  opts: {
    output: new Option(
      '-o, --output <path>',
      '(optional, when a single source file is provided) path for the generated interpolated file (default: same as source, i.e. interpolation done in-place)',
    ),
    envFile: new Option(
      '-f, --env-file <paths...>',
      "path(s) to your env file(s) (default: []) - same as dotenvx config's path option",
    ),
    ignoreUnsetVars: new Option(
      '--ignore-unset-vars',
      'suppress errors when the source file(s) contain variables not defined in your env file(s)',
    ),
    encoding: new Option(
      '--encoding <name>',
      `encoding of your source and env file(s) (default: '${defaultOptions.encoding}') - same as dotenvx config's encoding option`,
    ),
    envKeysFile: new Option(
      '--env-keys-file <path>',
      "path to your .env.keys file (default: same path as your env file) - same as dotenvx config's envKeysFile option",
    ),
    convention: new Option(
      '--convention <name>',
      "load a .env convention (available conventions: ['nextjs', 'flow']) - same as dotenvx config's convention option",
    ),
    verbose: new Option(
      '-v, --verbose',
      "sets log level to verbose - same as dotenvx config's verbose option",
    ),
    quiet: new Option(
      '-q, --quiet',
      "sets log level to error - same as dotenvx config's quiet option",
    ),
  },
};

export const helpText = {
  afterAll: '', // @TODO
};
