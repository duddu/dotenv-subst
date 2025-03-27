import { InvalidOptionArgumentError } from '@commander-js/extra-typings';

export function parseEncoding(value: string): BufferEncoding | undefined {
  if (!Buffer.isEncoding(value)) {
    throw new InvalidOptionArgumentError(
      `the encoding option must be a valid BufferEncoding type.`,
    );
  }
  return value;
}
