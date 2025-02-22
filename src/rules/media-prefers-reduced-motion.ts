import stylelint, { type Rule } from "stylelint";

const {
  createPlugin,
  utils: { ruleMessages, validateOptions },
} = stylelint;

const ruleName = "a11y-contemporary/media-prefers-reduced-motion";

export const messages = ruleMessages(ruleName, {
  // TODO
});

const meta = {
  url: "https://github.com/fpapado/stylelint-plugin-a11y-contemporary/blob/main/README.md",
};

const ruleFunction: Rule = (primary) => {
  return (_root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: primary,
      possible: [true],
    });

    if (!validOptions) {
      return;
    }
  };
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;
ruleFunction.meta = meta;

// NOTE: This must be an `export default`, for Stylelint 16 to pick it up
export default createPlugin(ruleName, ruleFunction);
