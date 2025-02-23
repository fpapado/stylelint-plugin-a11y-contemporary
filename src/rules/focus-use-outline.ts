import stylelint, { type Rule } from "stylelint";
import { Declaration } from "postcss";

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint;

const ruleName = "a11y-contemporary/focus-use-outline";

export const messages = ruleMessages(ruleName, {
  noBoxShadow:
    "Use outline instead of box-shadow. Outline follows borders as well, and can be inset and offset with outline-offset. box-shadow disappears in forced colors mode.",
});

const meta = {
  fixable: true,
  url: "https://github.com/fpapado/stylelint-plugin-a11y-contemporary/blob/main/README.md",
};

// @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Values_and_Units/CSS_data_types#css-wide_keywords
const CSS_KEYWORDS = new Set([
  "auto",
  "initial",
  "inherit",
  "revert",
  "revert-layer",
  "unset",
]);

const NONE = "none";

/**
 * Returns whether a declaration has an outline sibling delcaration, that is not a reset.
 */
function hasOutlineSiblingOtherThanNone(decl: Declaration): boolean {
  let found = false;
  decl.parent?.walkDecls("outline", (outlineDecl) => {
    if (outlineDecl.value !== NONE) {
      found = true;

      // stop walking
      return false;
    }
    return undefined;
  });
  return found;
}

/**
 * Returns whether a declaration has an outline reset sibling declaration.
 */
function hasOutlineSiblingNone(decl: Declaration): boolean {
  let found = false;
  decl.parent?.walkDecls("outline", (outlineDecl) => {
    if (outlineDecl.value === NONE) {
      found = true;

      // stop walking
      return false;
    }
    return undefined;
  });
  return found;
}

/**
 * Matches box-shadow of the type: inset? 0 0 0 4px red. Does not account for
 * other cases.
 */
const simpleBoxShadowRe =
  /(?<inset>inset)? 0[a-zA-Z]* 0[a-zA-Z]* 0[a-zA-Z]* (?<width>[0-9][a-zA-Z]*) (?<color>.*)/;

const ruleFunction: Rule = (primary, secondary) => {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: primary,
      possible: [true],
    });

    if (!validOptions) {
      return;
    }

    const additionalSelectors =
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (secondary?.additionalSelectors as string[] | undefined) ?? [];

    const allowStandaloneBoxShadow =
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      secondary?.allowStandaloneBoxShadow === true;

    root.walkRules((rule) => {
      if (
        rule.selector.includes(":focus") ||
        additionalSelectors.some((selector) => rule.selector.includes(selector))
      ) {
        rule.walkDecls((decl) => {
          if (
            decl.prop === "box-shadow" &&
            decl.value !== NONE &&
            !CSS_KEYWORDS.has(decl.value) &&
            (allowStandaloneBoxShadow
              ? // In the standalone codepath, only an outline reset sibling
                // marks this as invalid
                hasOutlineSiblingNone(decl)
              : // In the accompanied codepath, a lack of an outline sibling,
                // plus any outline reset, marks this as invalid
                !hasOutlineSiblingOtherThanNone(decl))
          ) {
            const fix = () => {
              // We do fixes on a best-effort basis, based on a regex. This will
              // not account for everything, just cases we consider unambiguous.
              const res = simpleBoxShadowRe.exec(decl.toString());

              if (!res) {
                return undefined;
              }

              const { inset, width, color } = res.groups as {
                inset?: "inset";
                width: string;
                color: string;
              };

              const newDecl = new Declaration({
                prop: "outline",
                value: `${width} solid ${color}`,
              });

              decl.replaceWith(newDecl);

              if (inset !== undefined) {
                newDecl.after({
                  prop: "outline-offset",
                  value: `calc(-1 * ${width})`,
                });
              }

              // Wipe any outline: none
              newDecl.parent?.walkDecls("outline", (decl) => {
                if (decl.value === NONE) {
                  decl.remove();
                }
              });
            };

            report({
              ruleName,
              message: messages.noBoxShadow,
              node: decl,
              result,
              fix,
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
