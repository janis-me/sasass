# `surimi` - Safe SASS validation library

Make your SCSS/SASS library safer with `surimi`. Define a schema for your data and ensure users use it correctly!

<!-- prettier-ignore-start -->
```scss
@use 'surimi' as s;

$my-schema: s.schema((
  'name': s.string().required()
));

$my-data: (
  'name': null
);

@include $my-schema.validate($my-data); // Error! 'name' is required!
```
<!-- prettier-ignore-end -->
