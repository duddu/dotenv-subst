import { logger } from './logger.js';

/**
 * Error codes the library can throw with; useful for targeted error handling.
 */
export type DotenvSubstErrorCode =
  | 'INVALID_OPTION'
  | 'DOTENVX_PARSE_FAILED'
  | 'FS_OPERATION_FAILED'
  | 'INTERPOLATION_FAILED';

class DotenvSubstError extends Error {
  public readonly code: DotenvSubstErrorCode;

  constructor(code: DotenvSubstErrorCode, message: string, cause?: unknown) {
    super(message);
    this.code = code;
    if (typeof cause !== 'undefined') {
      this.cause = cause;
    }
  }
}

/**
 * Test whether `error` is an object instance of {@linkcode DotenvSubstError}
 */
export function isDotenvSubstError(error: unknown): error is DotenvSubstError {
  return error instanceof DotenvSubstError;
}

/**
 * Test whether `error` is an object instance of {@linkcode DotenvSubstError} and
 * has a `code` equal to the one provided.
 */
export function isDotenvSubstErrorWithCode(
  error: unknown,
  code: DotenvSubstErrorCode,
): boolean {
  return isDotenvSubstError(error) && error.code === code;
}

export function throwError(
  ...[code, message, cause, ...params]: [
    ...ConstructorParameters<typeof DotenvSubstError>,
    ...unknown[],
  ]
): never {
  const errorCause = cause instanceof Error ? cause : void 0;
  const logParams = errorCause || !cause ? params : [cause, ...params];
  logger.error(`${code}: ${message}`, ...logParams);
  const error = new DotenvSubstError(code, message, errorCause);
  DotenvSubstError.captureStackTrace(error, throwError);
  throw error;
}
