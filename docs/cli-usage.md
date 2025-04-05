<script setup lang="ts">
import { data as routes } from './.vitepress/routes.data.js';
</script>

# CLI Usage

Once installed, use the following command structure to run the Command Line Interface:

::: code-group

```console [global]
dotenv-subst [options] <source...>
```

```console [local]
./node_modules/.bin/dotenv-subst [options] <source...>
```

```console [npx]
npx dotenv-subst [options] <source...>
```

:::

Each positional argument is interpreted as the path (absolute or relative to the current working directory) to a source file containing variable placeholders for interpolation.

All available command options and flags are documented in <a :href="routes.cliOptions.link">CLI Options Reference</a>.

The CLI can also be run using the `dotenvsubst` command, which is registered as **bin alias** in the distributed npm package.

## Basic Example

<!-- @include: ../README.md#cli-basic-example -->

## 🔍 Further Reading

- For a comprehensive list of usage examples, head over to the <a :href="routes.cliExamples.base + routes.cliExamples.link">CLI Examples</a> section.

- Check out the <a :href="routes.supportedSyntax.link">{{ routes.supportedSyntax.text.toLowerCase() }}</a> for defining interpolation variables in your source files.

