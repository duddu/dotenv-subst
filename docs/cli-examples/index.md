---
outline: false
---

<script setup lang="ts">
import { data as routes } from '../.vitepress/routes.data.js';
</script>

# CLI Usage Examples

This section provides several examples of CLI usage. The pages below are automatically generated and kept up to date based on the same [e2e tests fixtures](https://github.com/duddu/dotenv-subst/tree/main/tests/e2e/fixtures) which are used to setup test cases for the command line interface quality assurance.

<ol>
  <li v-for="example in routes.cliExamples.items">
    <p><a :href="routes.cliExamples.base + example.link">{{ example.text }}</a></p>
  </li>
</ol>
