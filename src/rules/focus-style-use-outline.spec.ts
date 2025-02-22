import { it, expect, describe } from "vitest";
import { getTestRule } from "vitest-stylelint-utils";
import type { Rule } from "stylelint";
import plugin, {
  messages as pluginMessages,
} from "./focus-style-use-outline.js";

const plugins = [plugin];

const {
  ruleName,
  rule: { messages },
} = plugin as {
  ruleName: string;
  rule: Rule & { messages: typeof pluginMessages };
};

const testRule = getTestRule({ plugins, it, expect, describe });

testRule({
  plugins,
  ruleName,
  config: [true],
  accept: [
    {
      code: ":focus { outline: 2px solid blue; }",
    },
    {
      code: ":focus-visible { outline: 2px solid blue; }",
    },
    {
      code: ":focus-within { outline: 2px solid blue; }",
    },
    {
      code: ":focus { outline: 2px solid blue; box-shadow: 0 0 0 2px red; }",
    },
    {
      code: ":focus { outline: 2px solid transparent; box-shadow: 0 0 0 2px red; }",
    },
    {
      code: "a { :focus { outline: 2px solid blue; box-shadow: 0 0 0 2px red; }}",
    },
  ],

  reject: [
    {
      code: ":focus { box-shadow: 0 0 0 2px red; }",
      message: messages.noBoxShadow,
    },
    {
      code: ":focus-visible { box-shadow: 0 0 0 2px red; }",
      message: messages.noBoxShadow,
    },
    {
      code: ":focus-within { box-shadow: 0 0 0 2px red; }",
      message: messages.noBoxShadow,
    },
    {
      code: "a { &:focus { box-shadow: 0 0 0 2px red; }}",
      message: messages.noBoxShadow,
    },
  ],
});
