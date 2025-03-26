import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { beforeEach, describe, expect, it } from 'vitest';

import pkg from '../../src/shared/package.js';

describe('dotenvx', () => {
  describe('command line help info', () => {
    const sharedOptsEntries: [string, RegExp][] = [
      [
        '--env-file',
        /^\s+-f, --env-file <paths...>\s+path\(s\)\s+to\s+your\s+env\s+file\(s\)\s+\(default:\s+\[\]\)/m,
      ],
      [
        '--env-keys-file',
        /^.+\s+--env-keys-file <path>\s+path\s+to\s+your\s+.env.keys\s+file\s+\(default:\s+same\s+path\s+as\s+your\s+env\s+file\)/m,
      ],
      [
        '--convention',
        /^\s+--convention <name>\s+load\s+a\s+.env\s+convention\s+\(available\s+conventions:\s+\['nextjs', 'flow'\]\)/m,
      ],
    ];

    let dotenvxStdout: string;
    let dotenvSubstStdout: string;

    beforeEach(async () => {
      [{ stdout: dotenvxStdout }, { stdout: dotenvSubstStdout }] =
        await Promise.all([
          promisify(exec)(`node ${pkg.bin['dotenv-subst']} --help`, {
            encoding: 'utf-8',
          }),
          promisify(exec)('node ./node_modules/.bin/dotenvx run --help', {
            encoding: 'utf-8',
          }),
        ]);
    });

    sharedOptsEntries.map(([optionFlag, optionRegExp]) => {
      it(`specifications for ${optionFlag} should match`, () => {
        expect(dotenvxStdout).toMatch(optionRegExp);
        expect(dotenvSubstStdout).toMatch(optionRegExp);
      });
    });
  });
});
