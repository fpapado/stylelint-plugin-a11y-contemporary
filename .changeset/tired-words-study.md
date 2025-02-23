---
"stylelint-plugin-a11y-contemporary": minor
---

### Add `allowStandaloneBoxShadow` to `focus-use-outline`

By default, this rule considers standalone `box-shadow` declarations inside a
focus-related rule to be an error, because it is generally not easy to prove
that a box-shadow is a shadow, instead of a focus indicator.

For example, this would be flagged as an error:

```css
:focus {
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.52);
}
```

The rule makes this choice, because CSS resets often set a blanket
`outline: none` on elements, meaning that there will not be an explicit reset
rule on the element.

Your tolerance for false positives vs false negatives (flagging valid shadows
vs. allowing focus without an outline) might be different to this default,
especially if your CSS reset does not remove outlines.

You can use the `allowStandaloneBoxShadow` option, to allow these rules.

```json
{
  "rules": {
    "a11y-contemporary/focus-use-outline": [
      true,
      { "allowStandaloneBoxShadow": true }
    ]
  }
}
```
