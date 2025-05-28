# `ssass` - Safe SASS validation library

Make your SCSS/SASS library safer with `ssass`. Define a schema for your data and ensure users use it correctly!

<!-- prettier-ignore-start -->
```scss
@use 'ssass' as s;

$my-schema: s.schema((
  'name': s.string().required()
));

$my-data: (
  'name': null
);

@include $my-schema.validate($my-data); // Error! 'name' is required!
```
<!-- prettier-ignore-end -->
