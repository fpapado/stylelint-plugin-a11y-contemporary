# media-prefers-reduced-motion

```css
a {
  animation: spin 2s ease;
}
```

## Options

### `true`

The following patterns are considered problems:

```css
a {
  animation: spin 2s ease;
}
```

The following patterns are _not_ considered problems:

```css
@media (prefers-reduced-motion: no-preference) {
  a {
    animation: spin 2s ease;
  }
}
```

## When Not To Use It

<!-- TODO -->

## Further Reading

<!-- TODO -->
