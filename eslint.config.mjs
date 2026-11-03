import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

export default [
    {
        ignores: [
            'dist/',
            'docs/',
            'node_modules/',
            'webpack.config.js',
            'webpack.dev.config.js',
            'server.js',
            'netlify/',
            'eslint.config.mjs',
        ],
    },

    js.configs.recommended,

    ...tseslint.configs.recommended,

    {
        plugins: {
            prettier: prettierPlugin,
            import: importPlugin,
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
            },
        },
        rules: {
            'no-debugger': 'off',
            'no-console': 0,
            'class-methods-use-this': 'off',
            '@typescript-eslint/no-explicit-any': 'error',
            'prettier/prettier': 'error',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
        },
    },

    prettierConfig,
];