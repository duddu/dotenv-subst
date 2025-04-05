import { Argument, Option } from '@commander-js/extra-typings';
import { styleText } from 'node:util';

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
      '(only valid for single source file) optional output file path (defaults to in-place interpolation)',
    ),
    envFile: new Option(
      '-f, --env-file <paths...>',
      'path(s) to your env file(s) (default: [])' +
        styleDescNote('forwarded to dotenvx only'),
    ),
    ignoreUnsetVars: new Option(
      '--ignore-unset-vars',
      'do not abort if source file(s) contain variables not defined in env file(s)',
    ),
    encoding: new Option(
      '--encoding <name>',
      `encoding of your source and env file(s) (default: '${defaultOptions.encoding}')` +
        styleDescNote('forwarded to dotenvx'),
    ),
    envKeysFile: new Option(
      '--env-keys-file <path>',
      'path to your .env.keys file (default: same path as your env file)' +
        styleDescNote('forwarded to dotenvx only'),
    ),
    overload: new Option(
      '--overload',
      'override existing env variables' +
        styleDescNote('forwarded to dotenvx only'),
    ),
    convention: new Option(
      '--convention <name>',
      "load a .env convention (available conventions: ['nextjs', 'flow'])" +
        styleDescNote('forwarded to dotenvx only'),
    ),
    verbose: new Option(
      '-v, --verbose',
      'sets log level to verbose' + styleDescNote('forwarded to dotenvx'),
    ),
    quiet: new Option(
      '-q, --quiet',
      'sets log level to error' + styleDescNote('forwarded to dotenvx'),
    ),
  },
};

export const helpText = {
  afterAll:
    '\nMore info and CLI usage examples available here: https://dotenv-subst.duddu.dev/cli-examples \n',
};

function styleDescNote(noteText: string): string {
  return styleText(['dim'], ' — ' + noteText);
}
