# focus-use-outline

Encourages the use of `outline` for styling focus indicators, over `box-shadow`.

Reasoning:

- Outlines in contemporary browsers follow borders, which was the primary
  motivation for using `box-shadow` in the past.
- `box-shadow` disappears in forced-colors and Windows High Contrast modes,
  whereas `outline` is still visible.
- `outline` can be inset or offset via `outline-offset`, allowing better
  positioning when interactive areas sit flush with their container.

## Options

### `true`

The following patterns are considered problems:

```css
/* Explicitly resetting outline */
:focus {
  outline: none;
  box-shadow: 0 0 0 3px red;
}
/* Standalone box-shadow; see below for an option to tweak this */
:focus {
  box-shadow: 0 0 0 3px red;
}
:focus-visible {
  box-shadow: 0 0 0 3px red;
}
:focus-within {
  box-shadow: 0 0 0 3px red;
}
```

The following patterns are _not_ considered problems:

```css
:focus {
  outline: 3px solid blue;
}
:focus-visible {
  outline: 3px solid blue;
}
:focus-within {
  outline: 3px solid blue;
}

/* box-shadow can co-exist with outline, if the outline is not reset fully */
:focus {
  outline: 3px solid blue;
  box-shadow: 0 0 0 3px red;
}
```

## Secondary options

### `additionalSelectors`

By default, this rule considers any selector that includes `:focus`,
`:focus-visible` and `:focus-within` to be a focus-related style.

Sometimes, depending on polyfills, browser bug workarounds, or code
organisation, you might be using additional selectors to indicate focus-related
styles, such as `.focus-visible`.

You can provide `additionalSelectors`, to allow the plugin to target those
rules.

```json
{
  "rules": {
    "a11y-contemporary/focus-use-outline": [
      true,
      { "additionalSelectors": [".focus-visible"] }
    ]
  }
}
```

### `allowStandaloneBoxShadow`

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

## When Not To Use It

In most cases, you really should use `outline` for focus styles. You can disable
this rule with `/* stylelint-disable-next-line */` directivs, if there are
false-positives, e.g. if you are styling outlines in a different selector, and
also use a decorative `box-shadow`.

There is one advanced focus-styling technique, whereby you stack `box-shadow`s,
to create a focus indicator that is visible on multiple backgrounds. If you are
doing this, you can still use this rule, and set an outline like
`outline: 2px solid transparent`, so that you preserve forced-colors mode
compatibility.

```

```
