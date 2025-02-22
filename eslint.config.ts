import eslint from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import tseslint, { type ConfigArray } from "typescript-eslint";

const config: ConfigArray = tseslint.config(
  { ignores: ["dist", "prettier.config.js"] },
  eslint.configs.recommended,
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
    rules: {
      // @see https://typescript-eslint.io/rules/no-unused-vars/#what-benefits-does-this-rule-have-over-typescript
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    files: ["src/**/*.spec.ts"], // or any other pattern
    plugins: {
      vitest,
    },
    rules: {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ...vitest.configs!.recommended.rules,
      "vitest/max-nested-describe": ["error", { max: 3 }],
    },
  },
);

export default config;
