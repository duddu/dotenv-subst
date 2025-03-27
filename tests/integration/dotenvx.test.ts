import { beforeEach, describe, expect, it } from 'vitest';

import { runNodeExecutable } from './integration-utils.js';

describe('dotenvx cli', () => {
  describe('command help information', () => {
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
      [dotenvxStdout, dotenvSubstStdout] = await Promise.all([
        runNodeExecutable('dist/cli/dotenv-subst.js', ['--help']),
        runNodeExecutable('node_modules/.bin/dotenvx', ['run', '--help']),
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
