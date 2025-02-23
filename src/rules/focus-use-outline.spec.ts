import { it, expect, describe } from "vitest";
import { getTestRule } from "vitest-stylelint-utils";
import type { Rule } from "stylelint";
import plugin, { messages as pluginMessages } from "./focus-use-outline.js";

const plugins = [plugin];

const {
  ruleName,
  rule: { messages },
} = plugin as {
  ruleName: string;
  rule: Rule & { messages: typeof pluginMessages };
};

const testRule = getTestRule({ plugins, it, expect, describe });

// Default config
testRule({
  plugins,
  ruleName,
  config: [true],
  fix: true,
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
      // Both box-shadow and outline are allowed
      code: ":focus { outline: 2px solid blue; box-shadow: 0 0 0 2px red; }",
    },
    {
      // Ditto
      code: ":focus { outline: 2px solid transparent; box-shadow: 0 0 0 2px red; }",
    },
    {
      // Nesting
      code: "a { :focus { outline: 2px solid blue; box-shadow: 0 0 0 2px red; }}",
    },
    {
      code: `
        :focus { 
          box-shadow: none; 
          box-shadow: auto; 
          box-shadow: initial; 
          box-shadow: inherit; 
          box-shadow: revert; 
          box-shadow: revert-layer; 
          box-shadow: unset; 
        }`,
    },
    {
      code: ":focus { box-shadow: auto; }",
    },
  ],

  reject: [
    {
      code: ":focus { box-shadow: 0 0 0 2px red; }",
      fixed: ":focus { outline: 2px solid red; }",
      message: messages.noBoxShadow,
    },
    {
      code: ":focus-visible { box-shadow: 0 0 0 2px red; }",
      fixed: ":focus-visible { outline: 2px solid red; }",
      message: messages.noBoxShadow,
    },
    {
      code: ":focus-within { box-shadow: 0 0 0 2px red; }",
      fixed: ":focus-within { outline: 2px solid red; }",
      message: messages.noBoxShadow,
    },
    // If an outline is reset altogether, then box-shadow is disallowed
    {
      code: ":focus { outline: none; box-shadow: 0 0 0 2px red; }",
      fixed: ":focus { outline: 2px solid red; }",
      message: messages.noBoxShadow,
    },
    // nesting
    {
      code: "a { &:focus { box-shadow: 0 0 0 2px red; }}",
      fixed: "a { &:focus { outline: 2px solid red; }}",
      message: messages.noBoxShadow,
    },
    // inset
    {
      code: ":focus { box-shadow: inset 0 0 0 2px red; }",
      fixed:
        ":focus { outline: 2px solid red; outline-offset: calc(-1 * 2px); }",
      message: messages.noBoxShadow,
    },
  ],
});

// Custom selectors
testRule({
  plugins,
  ruleName,
  config: [
    true,
    { additionalSelectors: [":custom-focus-visible", ".focus-visible"] },
  ],
  reject: [
    {
      code: ":custom-focus-visible { box-shadow: 0 0 0 2px blue; }",
      message: messages.noBoxShadow,
    },
    {
      code: ".focus-visible { box-shadow: 0 0 0 2px blue; }",
      message: messages.noBoxShadow,
    },
  ],
});

// Standalone box-shadow
testRule({
  plugins,
  ruleName,
  config: [true, { allowStandaloneBoxShadow: true }],
  accept: [
    {
      // Standalone box-shadow is OK here
      code: ":focus { box-shadow: 0 2px 0 2px rgba(0, 0, 0, 0.52); }",
    },
    {
      // Any accompanied box-shadow is still ok
      code: ":focus { outline: 2px solid red; box-shadow: 0 2px 0 2px rgba(0, 0, 0, 0.52); }",
    },
  ],
  reject: [
    {
      // If an outline is reset altogether, then box-shadow is still disallowed
      code: ":focus { outline: none; box-shadow: 0 0 0 2px red; }",
      fixed: ":focus { outline: 2px solid red; }",
      message: messages.noBoxShadow,
    },
  ],
});
