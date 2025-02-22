/** @type {import('prettier').Config} */
export default {
  plugins: ["prettier-plugin-packagejson"],
  trailingComma: "all",
  arrowParens: "always",
  overrides: [
    {
      // VS Code does not support json5 (especially autocomplete/schemas), so we
      // need to associate those files as jsonc. This helps prettier format it
      // in a way that is compatible, for example avoiding unquoted properties
      // and dangling commas, which are only supported in json.
      files: "renovate.json5",
      options: {
        parser: "json",
      },
    },
    {
      files: ["*.md"],
      options: {
        proseWrap: "always",
      },
    },
  ],
};
