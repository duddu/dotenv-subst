import { throwError } from '../../shared/errors.js';

export function parseEncoding(value: string): BufferEncoding | undefined {
  if (!Buffer.isEncoding(value)) {
    throwError(
      'INVALID_OPTION',
      `invalid value '${value}' provided for encoding option, expecting BufferEncoding`,
    );
  }
  return value;
}
