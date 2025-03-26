import { beforeEach, describe, expect, it, vi } from 'vitest';

import { logger } from '../../src/shared/logger.js';
import { defaultOptions, getParsedOptions } from '../../src/shared/options.js';
import { getDotenvParseOutput } from '../../src/lib/helpers/dotenv.js';
import {
  getFileContent,
  getWritablePath,
  writeFileContent,
} from '../../src/lib/helpers/filesystem.js';
import { getInterpolatedContent } from '../../src/lib/helpers/interpolate.js';

import lib from '../../src/lib/index.js';

vi.mock('../../src/shared/logger.js');
vi.mock('../../src/shared/options.js', { spy: true });
vi.mock('../../src/shared/utils.js', { spy: true });
vi.mock('../../src/lib/helpers/dotenv.js');
vi.mock('../../src/lib/helpers/filesystem.js');
vi.mock('../../src/lib/helpers/interpolate.js');

describe(lib, () => {
  beforeEach(async () => {
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

    [getFileContent, getWritablePath].map((fn) => {
      describe(`if ${fn.name} fails once`, () => {
        it(`should not call ${writeFileContent.name}`, async () => {
          vi.mocked(fn).mockImplementation(() => {
            if (vi.mocked(fn).mock.calls.length === optionsStub.source.length) {
              return Promise.reject(`${fn.name}_errorStub`);
            }
            return Promise.resolve(`${fn.name}_returnStub`);
          });

          try {
            await lib(optionsStub);
          } catch (error) {
            expect(error).toBe(`${fn.name}_errorStub`);
          }

          expect(vi.mocked(writeFileContent)).not.toHaveBeenCalled();
        });
      });
    });

    [getInterpolatedContent].map((fn) => {
      describe(`if ${fn.name} fails once`, () => {
        it(`should not call ${writeFileContent.name}`, async () => {
          vi.mocked(fn).mockImplementation(() => {
            if (vi.mocked(fn).mock.calls.length === optionsStub.source.length) {
              throw `${fn.name}_errorStub`;
            }
            return `${fn.name}_returnStub`;
          });

          try {
            await lib(optionsStub);
          } catch (error) {
            expect(error).toBe(`${fn.name}_errorStub`);
          }

          expect(vi.mocked(writeFileContent)).not.toHaveBeenCalled();
        });
      });
    });
  });
});
