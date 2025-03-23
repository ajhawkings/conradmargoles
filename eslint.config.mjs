/* eslint-disable import/no-anonymous-default-export */
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  { ignores: [".next/*"] },
  {
    files: ["*.ts", "*.tsx"],
    rules: {
      indent: ["error", 2],
      quotes: ["error", "single"],
      semi: ["error", "never"],
      camelcase: ["error"],
      eqeqeq: ["error"],
      "dot-notation": ["error"],
      "no-return-assign": ["error"],
      "no-var": ["error"],
      "prefer-const": ["error"],
      "sort-imports": ["error", { allowSeparatedGroups: true }],
      "spaced-comment": ["error"],
      "space-before-function-paren": ["error", "always"],
      "object-curly-spacing": ["error", "always"],
      "eol-last": ["error", "always"],
    },
  },
];
