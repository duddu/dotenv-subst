import { describe, expect, it } from 'vitest';

import lib, { type DotenvSubstOutput } from '../../src/lib/index.js';
import {
  isDotenvSubstError,
  isDotenvSubstErrorWithCode,
  type DotenvSubstErrorCode,
} from '../../src/shared/errors.js';
import type { DotenvSubstOptions } from '../../src/shared/options.js';

import * as _exports from '../../src/main.js';

describe('main', () => {
  describe('exports', () => {
    it('default', () => {
      expect(_exports.default).toBe(lib);
    });

    it(isDotenvSubstError, () => {
      expect(_exports.isDotenvSubstError).toBe(isDotenvSubstError);
    });

    it(isDotenvSubstErrorWithCode, () => {
      expect(_exports.isDotenvSubstErrorWithCode).toBe(
        isDotenvSubstErrorWithCode,
      );
    });

    it('DotenvSubstErrorCode', () => {
      const testCode: DotenvSubstErrorCode = 'INTERPOLATION_FAILED';
      const testCodeExp: _exports.DotenvSubstErrorCode = testCode;
      expect(testCodeExp).toBe(testCode);
    });

    it('DotenvSubstOptions', () => {
      const testOpts: DotenvSubstOptions = { source: 'srcStub' };
      const testOptsExp: _exports.DotenvSubstOptions = testOpts;
      expect(testOptsExp).toBe(testOpts);
    });

    it('DotenvSubstOutput', () => {
      const testOutput: DotenvSubstOutput = {
        outputPath: 'pathStub',
        interpolatedContent: 'contentStub',
      };
      const testOutputExp: _exports.DotenvSubstOutput = testOutput;
      expect(testOutputExp).toBe(testOutput);
    });
  });
});
