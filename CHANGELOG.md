# stylelint-plugin-a11y-contemporary

## 2500.2.0

### Minor Changes

- c055a23: ### Add `allowStandaloneBoxShadow` to `focus-use-outline`

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

## 2500.1.0

### Minor Changes

- 075c10f: Add `additionalSelectors` secondary option, to allow specifying any
  custom selectors that should be targeted, in addition to the built-in
  :focus/:focus-visible/:focus-within.

### Patch Changes

- 075c10f: Ensure that autofix also removes `outline: none` declarations

## 2500.0.3

### Patch Changes

- eee01a3: `focus-use-outline`: allow
  [CSS-wide keywords](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Values_and_Units/CSS_data_types#css-wide_keywords),
  as well as `none` to be set for `box-shadow`, without reporting an issue.

## 2500.0.2

### Patch Changes

- f6eb53e: Fix rule name, from `a11y-contemporary/focus-style-use-outline`, to
  `a11y-contemporary/focus-use-outline`

## 2500.0.1

### Patch Changes

- 5cbea99: Initial release
