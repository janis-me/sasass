<p align="center">
  <a href="https://github.com/janis-me/surimi" target="_blank" rel="noopener noreferrer">
    <img width="180" src="./surimi.png" alt="Themed logo">
  </a>
</p>
<p align="center" style="margin-top: -8px">
  <a href="https://npmjs.com/package/surimi">
    <img alt="surimi on npm" src="https://img.shields.io/npm/v/surimi?label=surimi%20on%20npm%20&labelColor=orange&color=grey">
  </a>
  <a href="https://github.com/janis-me/surimi">
    <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/janis-me/surimi?style=flat">
  </a>
</p>

# `surimi` - Safe SASS validation library

Make your SCSS/SASS safer with `surimi`. Define a schema for your data and ensure users use it correctly!

- 🔒 Bulletproof error-checking makes sure you (or your users) don't miss a thing!
- 🚀 No runtime! It's all just SCSS. You'll see the error before it's too late
- 🎭 Make it your own! All labels / prefixes can be changed to represent your library
- 🌈 Beautiful, customizable error messages
- ✅ Tested with [Vitest](https://vitest.dev) and the sass compiler

## installation

To use `surimi`, you gota have `sass`, `sass-embedded` or any other SASS/SCSS compiler installed. Then just

```bash
# npm
npm install -D surimi
# pnpm
pnpm add -D surimi
```

and.. that's it!

```scss
@use 'surimi' as s;

$my-number-schema: s.number(
  $gte: 18,
);

$my-string-schema: s.string(
  $min-length: '4',
  $starts-with: 'su',
  $ends-with: 'mi',
);

@include s.validate($my-number-schema, 15); // Oh-oh, an error!
@include s.validate($my-string-schema, 'tofu'); // No way!
```

You will recognize many of the properties - they are simple strings similar to 'zod' or 'yup'. And if you do put a wrong one.. We got you covered!

```
[surimi] `string.min` is not a valid validator. Allowed validators are: [eq, in, not-in, contains, not-contains, ... max-length, min-length]
    ╷
7   │   $my-string-schema: s.string(
    │ ┌────────────────────^
8   │ │   $min: 'su',
9   │ │   $ends-with: 'mi',
10  │ │ );
    │ └─^
```

All `surimi` methods are validated themselves - leaving zero room for errors. Of course, validation errors look just as nice:

```
[surimi] Value must be greater than or equal to 18
    ╷
12  │ @include s.validate($my-number-schema, 15); // Oh-oh, an error!
    │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    ╵
```

## Usage

At this time, only three simple validators are supported: `string`, `number` and `map`. We're working on extending them!

Regardless of which validator you use, pass the result into either `surimi.validate` or `surimi.validate-fn`. The first is a mixin you can use with `@include`, the second one is a function you can just call. Both receive the same arguments, with two differences:

1. When `throw` is set to `false`, the mixin will print out warnings instead. The function will **return the errors** as a list.
2. The function cannot be called without specifying a return value. That's a limitation of SCSS, and the reason the mixin exists!

In any case, the methods have no side-effects. They either just throw errors/warnings, or return the errors.
