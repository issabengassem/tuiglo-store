import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "next-env.d.ts",
      "products/**",
      "hero-candidates/**",
      "reference/**",
      "outputs/**",
      "frontend-design/**",
      "TUIGLO_Logo_Identity/**",
    ],
  },
];

export default eslintConfig;
