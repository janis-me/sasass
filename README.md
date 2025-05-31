<p align="center">
  <a href="https://github.com/janis-me/surimi" target="_blank" rel="noopener noreferrer">
    <img width="180" src="https://surimi.dev/surimi-512x512.webp" alt="Surimi logo">
  </a>
</p>
<p align="center" style="margin-top: -8px">
  <a href="https://surimi.dev">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-online-orange">
  </a>
  <a href="https://npmjs.com/package/surimi">
    <img alt="surimi on npm" src="https://img.shields.io/npm/v/surimi?label=surimi%20on%20npm%20&labelColor=grey&color=orange">
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

> [!NOTE]  
> Documentation and reference are now available on our website, [surimi.dev](https://surimi.dev).
> For a quick intro into surimi, check out [surimi.dev/intro](https://surimi.dev/intro)

## installation

Surimi is available as an npm package

```bash
# npm
npm install surimi
# pnpm
pnpm add surimi
```

or via a CDN like unpkg. To load it from a CDN, just `@use` it in your Sass file:

```scss
@use 'https://unpkg.com/surimi@latest' as s;
```

## introduction

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
```

All `surimi` methods are validated themselves - leaving zero room for errors. Of course, validation errors look just as nice:

```
[surimi] Value must be greater than or equal to 18
```

For a full introduction, visit our [docs](https://surimi.dev/intro), or check out the [reference](https://surimi.dev/reference)
