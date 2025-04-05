---
aside: false
---

<script setup lang="ts">
import { useData } from 'vitepress';
import { data as routes } from '../.vitepress/routes.data.js';
import type { CLIUsageExampleParams } from './[example].paths.js';
const params = useData().params as unknown as CLIUsageExampleParams;
</script>

<div class="breadcrumbs">
  <a :href="routes.cliExamples.base + routes.cliExamples.link">‹ CLI Usage Examples</a>
</div>

<h1>{{ params.index }}. {{ params.title }}</h1>

<!-- @content -->

## 🔍 Further Reading

- Check out the <a :href="routes.supportedSyntax.link">{{ routes.supportedSyntax.text.toLowerCase() }}</a> for defining interpolation variables in your source files.

- All available command options and flags are documented in <a :href="routes.cliOptions.link">CLI Options Reference</a>.
