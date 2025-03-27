import { describe, expect, it } from 'vitest';

import lib, { type DotenvSubstOutput } from '../../src/lib/index.js';
import {
  isDotenvSubstError,
  isDotenvSubstErrorWithCode,
  DotenvSubstError,
  type DotenvSubstErrorCode,
} from '../../src/shared/errors.js';
import type { DotenvSubstOptions } from '../../src/shared/options.js';

import * as main from '../../src/main.js';

describe('main', () => {
  describe('exports', () => {
    expect(Object.keys(main)).toHaveLength(3);

    it('default', () => {
      expect(main.default).toBe(lib);
    });

    it(isDotenvSubstError, () => {
      expect(main.isDotenvSubstError).toBe(isDotenvSubstError);
    });

    it(isDotenvSubstErrorWithCode, () => {
      expect(main.isDotenvSubstErrorWithCode).toBe(isDotenvSubstErrorWithCode);
    });

    it(`type ${DotenvSubstError.name}`, () => {
      expect(main).not.toHaveProperty(DotenvSubstError.name);
      const testErr = new DotenvSubstError('INTERPOLATION_FAILED', 'msgStub');
      const testErrExp: main.DotenvSubstError = testErr;
      expect(testErrExp).toBe(testErr); // only ensuring type is correctly exported
    });

    it('type DotenvSubstErrorCode', () => {
      const testCode: DotenvSubstErrorCode = 'INTERPOLATION_FAILED';
      const testCodeExp: main.DotenvSubstErrorCode = testCode;
      expect(testCodeExp).toBe(testCode); // only ensuring type is correctly exported
    });

    it('type DotenvSubstOptions', () => {
      const testOpts: DotenvSubstOptions = { source: 'srcStub' };
      const testOptsExp: main.DotenvSubstOptions = testOpts;
      expect(testOptsExp).toBe(testOpts); // only ensuring type is correctly exported
    });

    it('type DotenvSubstOutput', () => {
      const testOutput: DotenvSubstOutput = {
        outputPath: 'pathStub',
        interpolatedContent: 'contentStub',
      };
      const testOutputExp: main.DotenvSubstOutput = testOutput;
      expect(testOutputExp).toBe(testOutput); // only ensuring type is correctly exported
    });
  });
});
