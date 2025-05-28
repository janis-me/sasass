import eslint from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint, { ConfigArray } from 'typescript-eslint';

export const baseConfig: ConfigArray = tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.stylisticTypeChecked,
  tseslint.configs.strictTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    settings: {
      react: {
        version: '19',
      },
    },
  },
  {
    ignores: ['**/node_modules/', '**/coverage/', '**/dist/', '**/.next/'],
  },
  {
    rules: {
      // A good rule, but we sometimes want to include redundant types for documentation purposes
      '@typescript-eslint/no-redundant-type-constituents': 'warn',
      // Allow the `T[]` syntax for simple types, but require `Array<T>` for more complex types
      // See https://typescript-eslint.io/rules/array-type#array-simple
      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'array-simple',
        },
      ],
      // For the rule details, see https://typescript-eslint.io/rules/no-unused-vars/
      // For the configuration, see https://eslint.org/docs/latest/rules/no-unused-vars
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
);

export const reactConfig: ConfigArray = tseslint.config(
  ...baseConfig,
  // @ts-expect-error https://github.com/jsx-eslint/eslint-plugin-react/issues/3878
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  reactHooks.configs['recommended-latest'],
);

export { eslint, tseslint };
export type { ConfigArray };
