import stylelint, { type Rule } from "stylelint";
import { type Declaration } from "postcss";

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint;

const ruleName = "a11y-contemporary/focus-style-use-outline";

export const messages = ruleMessages(ruleName, {
  noBoxShadow:
    "Use outline instead of box-shadow. Outline follows borders as well, but can be inset and offset with outline-offset. box-shadow disappears in forced colors mode.",
});

const meta = {
  url: "https://github.com/fpapado/stylelint-plugin-a11y-contemporary/blob/main/README.md",
};

function hasOutlineSibling(decl: Declaration): boolean {
  let found = false;
  decl.parent?.walkDecls("outline", (_decl) => {
    found = true;

    // stop walking
    return false;
  });
  return found;
}

const ruleFunction: Rule = (primary) => {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: primary,
      possible: [true],
    });

    if (!validOptions) {
      return;
    }

    root.walkRules((rule) => {
      if (rule.selector.includes(":focus")) {
        rule.walkDecls((decl) => {
          if (decl.prop === "box-shadow" && !hasOutlineSibling(decl)) {
            report({
              ruleName,
              message: messages.noBoxShadow,
              node: decl,
              result,
            });
          }
        });
      }
    });
  };
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;
ruleFunction.meta = meta;

// NOTE: This must be an `export default`, for Stylelint 16 to pick it up
export default createPlugin(ruleName, ruleFunction);
