import eslintPluginTs from '@typescript-eslint/eslint-plugin';
import parserTs from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';

export default [
  {
    files: ['src/**/*.{js,ts,tsx}'],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        jsxRuntime: 'automatic',
      },
    },
    plugins: {
      '@typescript-eslint': eslintPluginTs,
      react: reactPlugin,
    },
    settings: {
      react: {
        version: 'detect',
        runtime: 'automatic',
      },
    },
    rules: {
      ...eslintPluginTs.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      'constructor-super': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];