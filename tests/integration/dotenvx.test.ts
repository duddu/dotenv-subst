import { beforeAll, describe, expect, it } from 'vitest';

import { config } from '../../src/cli/command/config.js';
import { runNodeExecutable } from './integration-utils.js';

describe('dotenvx cli', () => {
  describe('command help information', () => {
    let dotenvxHelpStdout: string;

    beforeAll(async () => {
      dotenvxHelpStdout = await runNodeExecutable('node_modules/.bin/dotenvx', [
        'run',
        '--help',
      ]);
    });

    [
      config.opts.envFile,
      config.opts.envKeysFile,
      config.opts.overload,
      config.opts.convention,
    ].map(({ long, flags, description }) => {
      it(`${long.replace(/^--/, '')} option info should match`, () => {
        const parsedDescription = description
          .replace(/\S\[2m — forwarded.+/, '')
          .replace(/[.()[\]\\]/g, '\\$&')
          .replace(/\s+/g, '\\s+');
        const optionRegExp = new RegExp(
          `${flags}\\s+${parsedDescription}`,
          'm',
        );

        expect(dotenvxHelpStdout).toMatch(optionRegExp);
      });
    });
  });
});
