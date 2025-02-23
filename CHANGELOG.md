# stylelint-plugin-a11y-contemporary

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
