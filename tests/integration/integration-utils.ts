import { exec } from 'node:child_process';
import { resolve } from 'node:path';
import { promisify } from 'node:util';

export async function runNodeExecutable(
  path: string,
  args: string[] = [],
): Promise<string> {
  const { stdout } = await promisify(exec)(
    `node ${resolve(path)} ${args.join(' ')}`,
    {
      encoding: 'utf-8',
    },
  );

  return stdout;
}
