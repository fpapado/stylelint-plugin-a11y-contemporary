import eslint from "@eslint/js";
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
);

export default config;
