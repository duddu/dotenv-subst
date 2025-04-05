---
outline: false
---

<script setup lang="ts">
import { data as routes } from './.vitepress/routes.data.js';
</script>

# Installation

This tool can be used as global executable, or as a dependency within an existing project. You can install it with:

::: code-group

```sh [npm]
# install as global package
npm install -g dotenv-subst

# or as local dependency
npm install -D dotenv-subst
```

```sh [pnpm]
# install as global package
pnpm add -g dotenv-subst

# or as local dependency
pnpm add -D dotenv-subst
```

```sh [yarn]
# install as global package
yarn global add dotenv-subst

# or as local dependency
yarn add -D dotenv-subst
```

```sh [bun]
# install as global package
bun add -g dotenv-subst

# or as local dependency
bun add -D dotenv-subst
```

:::

### Prerequisites

- Node.js version `^22.14` or `^23.10`.

## 🔍 Further Reading

- Check out the <a :href="routes.supportedSyntax.link">{{ routes.supportedSyntax.text.toLowerCase() }}</a> for defining interpolation variables in your source files.

- See the instructions on <a :href="routes.cliUsage.link">CLI usage</a> to learn how to use the tool, or browse the <a :href="routes.cliExamples.base + routes.cliExamples.link">examples</a> section for practical usage scenarios.
