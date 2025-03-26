// @ts-check
import eslint from '@eslint/js';
import vitest from '@vitest/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['**/build/**', '**/tmp/**', '**/coverage/**'],
  },
  eslint.configs.recommended,
  eslintConfigPrettier,
  {
    extends: [...tseslint.configs.recommended],

    files: ['**/*.ts', '**/*.mts'],

    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },

    rules: {
      '@typescript-eslint/explicit-function-return-type': 'warn',
    },

    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 2022,
      sourceType: 'module',

      globals: {
        ...globals.node,
      },

      parserOptions: {
        project: './tsconfig.test.json',
      },
    },
  },
  {
    files: ['tests/**'],

    plugins: {
      vitest,
    },

    rules: {
      ...vitest.configs.recommended.rules,
    },

    settings: {
      vitest: {
        typecheck: true,
      },
    },

    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
  },
);
