import * as console from 'node:console';
import { stderr, stdout } from 'node:process';
import { styleText } from 'node:util';

import pkg from '../shared/package.js';
import type { DotenvSubstOptions } from './options.js';
import type { PickRequired } from './utils.js';

const levels = ['error', 'info', 'debug'] as const;

type Level = (typeof levels)[number];

type LogMethod<L extends Level> = (
  message: string,
  ...params: unknown[]
) => ReturnType<(typeof console)[L]> | void;

type Logger = { [L in Level]: LogMethod<L> };

class DotenvSubstLogger implements Readonly<Logger> {
  private level: Level = 'info';

  public error = this.getLogMethod('error');
  public info = this.getLogMethod('info');
  public debug = this.getLogMethod('debug');

  private shouldLog(level: Level): boolean {
    return levels.indexOf(level) <= levels.indexOf(this.level);
  }

  private log<L extends Level>(
    level: L,
    args: Parameters<LogMethod<L>>,
  ): ReturnType<LogMethod<L>> {
    if (!this.shouldLog(level)) return;
    return doLog(level, args);
  }

  private getLogMethod<L extends Level>(level: L): LogMethod<L> {
    return (...args) => this.log<L>(level, args);
  }

  private setLevel(level: Level): void {
    this.level = level;
  }

  public configureLevel({
    quiet,
    verbose,
  }: PickRequired<DotenvSubstOptions, 'quiet' | 'verbose'>): void {
    if (quiet === true) this.setLevel('error');
    if (verbose === true) this.setLevel('debug');
  }
}

const logPrefix: string = `[${pkg.name}]`;

const loggerColors: { [L in Level]: Parameters<typeof styleText>[0] } = {
  error: 'red',
  info: 'blueBright',
  debug: 'magentaBright',
};

function getStyledLog(param: unknown, level: Level): unknown {
  return typeof param === 'string'
    ? styleText(
        loggerColors[level],
        param,
        // @ts-expect-error @types/node 22.14
        { stream: level === 'error' ? stderr : stdout },
      )
    : param;
}

function doLog(level: Level, args: unknown[]): void {
  args = [logPrefix, `${level}:`, ...args];
  args = args.map((arg) => getStyledLog(arg, level));
  return console[level].apply(null, args);
}

export const logger = Object.seal(new DotenvSubstLogger());
