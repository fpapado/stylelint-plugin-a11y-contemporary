# focus-use-outline

Encourages use of `outline` for styling focus indicators, over `box-shadow`.

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
:focus {
  outline: 3px solid blue;

  /* Any box-shadow can co-exist with outline */
  box-shadow: 0 0 0 3px red;
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
