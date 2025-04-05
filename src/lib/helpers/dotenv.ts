import {
  config as dotenvConfig,
  type DotenvConfigOptions,
  type DotenvParseOutput,
} from '@dotenvx/dotenvx';

import { throwError } from '../../shared/errors.js';
import { logger } from '../../shared/logger.js';
import type { DotenvConfigOptionsInherited } from '../../shared/options.js';
import type { PickRequired } from '../../shared/utils.js';

const dotenvConfigOptionsDefaults: PickRequired<
  Readonly<DotenvConfigOptions>,
  'strict' | 'overload' | 'ignore' | 'processEnv'
> = Object.freeze({
  strict: true,
  overload: false,
  ignore: [],
  processEnv: {},
});

function getDotenvConfigOptionsWithDefaults(
  options: DotenvConfigOptions,
): Readonly<DotenvConfigOptions> & typeof dotenvConfigOptionsDefaults {
  return Object.freeze({
    ...dotenvConfigOptionsDefaults,
    ...options,
  });
}

export function getDotenvParseOutput(
  options: DotenvConfigOptionsInherited &
    Pick<DotenvConfigOptions, 'path' | 'encoding'>,
): Readonly<DotenvParseOutput> {
  const dotenvConfigOptions = getDotenvConfigOptionsWithDefaults(options);

  const { error, parsed } = dotenvConfig(dotenvConfigOptions);

  if (typeof error !== 'undefined') {
    throwError(
      'DOTENVX_PARSE_FAILED',
      'dotenvx config threw an error during parsing',
      error,
      { dotenvConfigOptions },
    );
  }

  if (typeof parsed === 'undefined') {
    throwError(
      'DOTENVX_PARSE_FAILED',
      'dotenvx config did not return a valid parse output',
      void 0,
      { dotenvConfigOptions },
    );
  }

  logger.debug('DotenvConfigOptions', parsed);

  return Object.freeze<DotenvParseOutput>(parsed);
}
