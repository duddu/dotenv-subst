#!/usr/bin/env node

import { Command } from '@commander-js/extra-typings';
import * as console from 'node:console';
import { argv, exit, setUncaughtExceptionCaptureCallback } from 'node:process';

import main from '../main.js';
import pkg from '../shared/package.js';
import { config, helpText } from './command/config.js';
import { parseEncoding } from './command/parsers.js';

const program = new Command()
  .name(pkg.name)
  .description(pkg.description)
  .allowExcessArguments(false)
  .allowUnknownOption(false)
  .combineFlagAndOptionalValue(false)
  .showHelpAfterError(true)
  .addArgument(config.args.source)
  .addOption(config.opts.output)
  .addOption(config.opts.envFile)
  .addOption(config.opts.ignoreUnsetVars)
  .addOption(config.opts.encoding.argParser(parseEncoding))
  .addOption(config.opts.envKeysFile)
  .addOption(config.opts.convention)
  .addOption(config.opts.verbose.conflicts(config.opts.quiet.name()))
  .addOption(config.opts.quiet.conflicts(config.opts.verbose.name()))
  .version(pkg.version)
  .addHelpText('afterAll', helpText.afterAll);

setUncaughtExceptionCaptureCallback(handleUncaughtException);

program.parse(argv);

const {
  output,
  envFile,
  ignoreUnsetVars,
  encoding,
  envKeysFile,
  convention,
  verbose,
  quiet,
} = program.opts();

await main({
  source: program.processedArgs[0],
  output,
  envFile,
  ignoreUnsetVars,
  encoding,
  envKeysFile,
  convention,
  quiet,
  verbose,
});

type DotenvSubstCliInput = {
  args?: typeof program.args;
  opts: ReturnType<typeof program.opts>;
};

function handleUncaughtException(error: Error): never {
  try {
    const input: DotenvSubstCliInput = {
      ...(program.args.length > 0 ? { args: program.args } : {}),
      opts: program.opts(),
    };
    console.error('DotenvSubstCliInput:', input);
  } catch (cause) {
    console.error(new Error('failed to display command input', { cause }));
  }
  console.error(error);
  return exit(1);
}
