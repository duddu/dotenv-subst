import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getDotenvParseOutput } from '../../src/lib/helpers/dotenv.js';
import {
  getFileContent,
  getWritablePath,
  writeFileContent,
} from '../../src/lib/helpers/filesystem.js';
import { getInterpolatedContent } from '../../src/lib/helpers/interpolate.js';
import { logger } from '../../src/shared/logger.js';
import { defaultOptions, getParsedOptions } from '../../src/shared/options.js';

import lib from '../../src/lib/index.js';

vi.mock('../../src/lib/helpers/dotenv.js');
vi.mock('../../src/lib/helpers/filesystem.js');
vi.mock('../../src/lib/helpers/interpolate.js');
vi.mock('../../src/shared/logger.js');
vi.mock('../../src/shared/options.js', { spy: true });
vi.mock('../../src/shared/utils.js', { spy: true });

describe(lib, () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('with single source', () => {
    const optionsStub = { source: 'srcStub' };

    it(`should call ${getParsedOptions.name} once`, async () => {
      await lib(optionsStub);

      expect(vi.mocked(getParsedOptions)).toHaveBeenCalledExactlyOnceWith(
        optionsStub,
      );
    });

    it(`should call ${logger.configureLevel.name} once`, async () => {
      await lib(optionsStub);

      expect(vi.mocked(logger.configureLevel)).toHaveBeenCalledAfter(
        vi.mocked(getParsedOptions),
        true,
      );
      expect(vi.mocked(logger.configureLevel)).toHaveBeenCalledExactlyOnceWith({
        quiet: false,
        verbose: false,
      });
    });

    it(`should call ${getDotenvParseOutput.name} once`, async () => {
      await lib(optionsStub);

      expect(vi.mocked(getDotenvParseOutput)).toHaveBeenCalledAfter(
        vi.mocked(logger.configureLevel),
        true,
      );
      expect(vi.mocked(getDotenvParseOutput)).toHaveBeenCalledExactlyOnceWith({
        DOTENV_KEY: undefined,
        convention: undefined,
        encoding: defaultOptions.encoding,
        envKeysFile: undefined,
        path: undefined,
        quiet: false,
        verbose: false,
      });
    });

    it(`should call ${getFileContent.name} once`, async () => {
      await lib(optionsStub);

      expect(vi.mocked(getFileContent)).toHaveBeenCalledAfter(
        vi.mocked(getDotenvParseOutput),
        true,
      );
      expect(vi.mocked(getFileContent)).toHaveBeenCalledExactlyOnceWith(
        optionsStub.source,
        { encoding: defaultOptions.encoding },
      );
    });

    it(`should call ${getInterpolatedContent.name} once`, async () => {
      vi.mocked(getDotenvParseOutput).mockReturnValueOnce({});
      vi.mocked(getFileContent).mockReturnValueOnce(
        Promise.resolve('contentStub'),
      );
      await lib(optionsStub);

      expect(vi.mocked(getInterpolatedContent)).toHaveBeenCalledAfter(
        vi.mocked(getFileContent),
        true,
      );
      expect(vi.mocked(getInterpolatedContent)).toHaveBeenCalledExactlyOnceWith(
        'contentStub',
        {},
        { ignoreUnsetVars: defaultOptions.ignoreUnsetVars },
      );
    });

    it(`should call ${getWritablePath.name} once`, async () => {
      await lib(optionsStub);

      expect(vi.mocked(getWritablePath)).toHaveBeenCalledAfter(
        vi.mocked(getInterpolatedContent),
        true,
      );
      expect(vi.mocked(getWritablePath)).toHaveBeenCalledExactlyOnceWith(
        optionsStub.source,
      );
    });

    it(`should call ${writeFileContent.name} once`, async () => {
      vi.mocked(getInterpolatedContent).mockReturnValueOnce('contentStub');
      vi.mocked(getWritablePath).mockReturnValueOnce(
        Promise.resolve('pathStub'),
      );
      await lib(optionsStub);

      expect(vi.mocked(writeFileContent)).toHaveBeenCalledAfter(
        vi.mocked(getWritablePath),
        true,
      );
      expect(vi.mocked(writeFileContent)).toHaveBeenCalledExactlyOnceWith(
        'pathStub',
        'contentStub',
        { encoding: defaultOptions.encoding },
      );
    });

    it('should return generated output', async () => {
      vi.mocked(getInterpolatedContent).mockReturnValueOnce('contentStub');
      vi.mocked(getWritablePath).mockReturnValueOnce(
        Promise.resolve('pathStub'),
      );

      expect(await lib(optionsStub)).toStrictEqual([
        {
          interpolatedContent: 'contentStub',
          outputPath: 'pathStub',
        },
      ]);
    });
  });

  describe('with multiple sources', () => {
    const optionsStub = { source: ['srcStub1', 'srcStub2', 'srcStub3'] };

    [
      getFileContent,
      getInterpolatedContent,
      getWritablePath,
      writeFileContent,
    ].map((fn) => {
      it(`should call ${fn.name} for each source`, async () => {
        await lib(optionsStub);

        expect(vi.mocked(fn)).toHaveBeenCalledTimes(optionsStub.source.length);
      });
    });

    it('should return generated outputs', async () => {
      const outputsStub = optionsStub.source.map((_, i) => ({
        interpolatedContent: `contentStub#${i + 1}`,
        outputPath: `pathStub#${i + 1}`,
      }));

      vi.mocked(getInterpolatedContent).mockImplementation(
        () =>
          `contentStub#${vi.mocked(getInterpolatedContent).mock.calls.length}`,
      );
      vi.mocked(getWritablePath).mockImplementation(() =>
        Promise.resolve(
          `pathStub#${vi.mocked(getWritablePath).mock.calls.length}`,
        ),
      );

      expect(await lib(optionsStub)).toStrictEqual(outputsStub);
    });

    const doMockFnImpl = (
      fn: (...args: unknown[]) => unknown,
      errorStub: Error,
      returnPromise: boolean,
    ): void => {
      vi.mocked(fn).mockImplementation(() => {
        if (vi.mocked(fn).mock.calls.length === optionsStub.source.length) {
          if (returnPromise) {
            return Promise.reject(errorStub);
          }
          throw errorStub;
        }
        return returnPromise ? Promise.resolve() : void 0;
      });
    };

    [getFileContent, getInterpolatedContent, getWritablePath].map((fn) => {
      describe(`if ${fn.name} fails anytime`, () => {
        let errorThrown: Error;
        const errorStub = new Error(fn.name + 'errorStub');

        beforeEach(async () => {
          doMockFnImpl(fn, errorStub, fn !== getInterpolatedContent);

          try {
            await lib(optionsStub);
          } catch (error) {
            errorThrown = error;
          }
        });

        it(`should not call ${writeFileContent.name} once`, async () => {
          expect(vi.mocked(writeFileContent)).not.toHaveBeenCalled();
        });

        it(`should propagate and throw the error`, async () => {
          await vi.waitFor(() => typeof errorThrown !== 'undefined', {
            timeout: 50,
            interval: 0.5,
          });

          expect(errorThrown).toBe(errorStub);
        });
      });
    });
  });

  describe('with quiet option enabled', () => {
    it(`should configure the logger accordingly`, async () => {
      await lib({ source: 'srcStub', quiet: true });

      expect(vi.mocked(logger.configureLevel)).toHaveBeenCalledExactlyOnceWith({
        quiet: true,
        verbose: false,
      });
    });
  });

  describe('with verbose option enabled', () => {
    it(`should configure the logger accordingly`, async () => {
      await lib({ source: 'srcStub', verbose: true });

      expect(vi.mocked(logger.configureLevel)).toHaveBeenCalledExactlyOnceWith({
        quiet: false,
        verbose: true,
      });
    });
  });

  describe('with envFile option set', () => {
    it(`should pass it to ${getDotenvParseOutput.name}`, async () => {
      const envFileStub = ['envFileStub1', 'envFileStub2'];
      await lib({ source: 'srcStub', envFile: envFileStub });

      expect(vi.mocked(getDotenvParseOutput)).toHaveBeenCalledExactlyOnceWith(
        expect.objectContaining({
          path: envFileStub,
        }),
      );
    });
  });

  describe('with encoding option set', () => {
    beforeEach(async () => {
      await lib({ source: 'srcStub', encoding: 'ascii' });
    });

    it(`should pass it to ${getDotenvParseOutput.name}`, async () => {
      expect(vi.mocked(getDotenvParseOutput)).toHaveBeenLastCalledWith(
        expect.objectContaining({
          encoding: 'ascii',
        }),
      );
    });

    it(`should pass it to ${getFileContent.name}`, async () => {
      expect(vi.mocked(getFileContent).mock.lastCall).toContainEqual({
        encoding: 'ascii',
      });
    });

    it(`should pass it to ${writeFileContent.name}`, async () => {
      expect(vi.mocked(writeFileContent).mock.lastCall).toContainEqual({
        encoding: 'ascii',
      });
    });
  });

  describe('with ignoreUnsetVars option enabled', () => {
    it(`should pass it to ${getInterpolatedContent.name}`, async () => {
      await lib({ source: 'srcStub', ignoreUnsetVars: true });

      expect(vi.mocked(getInterpolatedContent).mock.lastCall).toContainEqual({
        ignoreUnsetVars: true,
      });
    });
  });

  describe('with noWrite option enabled', () => {
    it(`should not call ${writeFileContent.name} once`, async () => {
      await lib({ source: 'srcStub', noWrite: true });

      expect(vi.mocked(writeFileContent)).not.toHaveBeenCalled();
    });
  });
});
