# `stylelint-plugin-a11y-modern`

> Stylelint plugin for better accessibility, contemporary to codebases written in 2025 and beyond.

## Usage

You'll first need to install
[Stylelint](https://stylelint.io/user-guide/get-started):

```sh
npm install stylelint --save-dev
```

### Step 1: Installation

```sh
npm install stylelint-plugin-a11y-contemporary --save-dev
```

### Step 2: Configuration

Add `stylelint-plugin-a11y-contemporary` to the plugins section of your
[stylelint configuration file](https://github.com/stylelint/stylelint/blob/main/docs/user-guide/configure.md).

```json
{
  "plugins": ["stylelint-plugin-a11y-contemporary"],
  "rules": {
    "a11y-contemporary/media-prefers-reduced-motion": true
  }
}
```

## Rules

💼 Configurations enabled in.\
✅ Set in the `recommended` configuration.

| Name                                                                       | Description                                                                                     | 💼  |
| :------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------- | :-- |
| [media-prefers-reduced-motion](docs/rules/media-prefers-reduced-motion.md) | Ensures that all animations and transitions are wrapped in a prefers-reduced-motion media query | ✅  |

<!-- end auto-generated rules list -->

## FAQ

### What's up with the versions, like `2500.1.0`?

This package uses epoch-based SemVer, with an epoch corresponding to the last two digits of the year \* 100. For example, the epoch of the year 2025 would be 25 \* 100 = 2500. Versions within an epoch are done as usual in SemVer, for example `2501.0.0` is a major, `2501.2` is a minor, and `2501.2.5` is a patch.

If this package ends up being used in 21XX and beyond, we have bigger problems :)

We use epoch versioning in order to signal what the "current" year of the recommended ruleset is. All major bumps are SemVer major bumps as usual, whether within a given epoch, or between epochs. The epochs are just an easy way to show people when the rulesets were last revisited, since accessibility guidance and browser practices change over time..
