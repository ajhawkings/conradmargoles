import { globalIgnores } from 'eslint/config'
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

const config = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      camelcase: ['error'],
      eqeqeq: ['error'],
      'dot-notation': ['error'],
      'no-return-assign': ['error'],
      'no-var': ['error'],
      'prefer-const': ['error'],
      'sort-imports': ['error', { allowSeparatedGroups: true }],
      'spaced-comment': ['error'],
      'space-before-function-paren': ['error', 'always'],
      'object-curly-spacing': ['error', 'always'],
      'eol-last': ['error', 'always'],
    },
  },
]

export default config
