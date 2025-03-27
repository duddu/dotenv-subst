import { throwError } from '../../shared/errors.js';
import type { DotenvSubstOptions } from '../../shared/options.js';
import { isNonEmptyString, type PickRequired } from '../../shared/utils.js';

const varsInterpolationExp = /(?:\${\s*(\S+?)\s*}|\$?{{\s*(\S+?)\s*}})/gm;

export function getInterpolatedContent(
  content: string,
  variables: Record<string, string>,
  { ignoreUnsetVars }: PickRequired<DotenvSubstOptions, 'ignoreUnsetVars'>,
): string {
  const replacer = (
    varCaptureGroup: string,
    singleBracketMatch?: unknown,
    doubleBracketsMatch?: unknown,
  ): string => {
    let varName: string;
    if (isNonEmptyString(singleBracketMatch)) {
      varName = singleBracketMatch;
    } else if (isNonEmptyString(doubleBracketsMatch)) {
      varName = doubleBracketsMatch;
    } else {
      throwError(
        'INTERPOLATION_FAILED',
        'no variable capture group matched during interpolation, aborting',
      );
    }

    const varValue = variables[varName];

    if (typeof varValue === 'string') {
      return varValue;
    }

    if (ignoreUnsetVars === false) {
      throwError(
        'INTERPOLATION_FAILED',
        `unset variable '${varName}', i.e. not defined in the env file(s) provided (hint: enable the 'ignoreUnsetVars' flag to bypass)`,
      );
    }

    return varCaptureGroup;
  };

  const interpolated = content.replaceAll(varsInterpolationExp, replacer);

  return interpolated;
}
