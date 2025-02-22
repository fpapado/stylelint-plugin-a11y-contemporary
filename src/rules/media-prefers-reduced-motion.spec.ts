import { it, expect, describe } from "vitest";
import { getTestRule } from "vitest-stylelint-utils";
import type { Rule } from "stylelint";
import plugin, {
  messages as pluginMessages,
} from "./media-prefers-reduced-motion.js";

const plugins = [plugin];

const { ruleName } = plugin as {
  ruleName: string;
  rule: Rule & { messages: typeof pluginMessages };
};

const testRule = getTestRule({ plugins, it, expect, describe });

testRule({
  plugins,
  ruleName,
  config: [true],
  skip: true,
  accept: [
    {
      code: "@media (prefers-reduced-motion: no-preference) { a { animation: spin 2s ease; }}",
      description: "Enables motion conditionally",
    },
    {
      code: "a { animation: spin 2s ease; } @media (prefers-reduced-motion: reduce) { a { animation: none }}",
      description: "Reduces motion conditionally",
    },
    {
      // Nesting
      code: "a { animation: spin 2s ease; @media (prefers-reduced-motion: reduce) { animation: none }}",
      description: "Reduces motion conditionally (nested)",
    },
  ],

  reject: [
    {
      code: "a { animation: spin 2s ease; }",
    },
    {
      // Nesting
      code: "a { & { animation: spin 2s ease; } }",
    },
  ],
});
