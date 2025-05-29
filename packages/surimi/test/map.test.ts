import { describe, expect, it } from 'vitest';

import { compile } from './utils/compile';

const BASE_INPUT = `
@use 'surimi/index.scss' as s;
`;

describe('map validator', () => {
  it('creates a map validator correctly', async () => {
    const input = `${BASE_INPUT}
    $map-schema: s.map((
      'name': s.string($eq: 'surimi'),
      'age': s.number($min: 18, $max: 65),
    ));`;

    await expect(compile(input)).resolves.toBeDefined();
  });

  it('validates correct maps', async () => {
    const baseInput = `${BASE_INPUT}
    $map-schema: s.map((
      'name': s.string($eq: 'surimi'),
      'age': s.number($min: 18, $max: 65),
    ));`;

    const successInput = `${baseInput}
    @include s.validate($map-schema, (
      'name': 'surimi',
      'age': 30,
    ));`;

    await expect(compile(successInput)).resolves.toBeDefined();
  });

  it('throws on sub-schema error', async () => {
    const baseInput = `${BASE_INPUT}
    $map-schema: s.map((
      'name': s.string($eq: 'surimi'),
      'age': s.number($min: 18, $max: 65),
    ));`;

    const failureInput = `${baseInput}
    @include s.validate($map-schema, (
      'name': 'surimi',
      'age': 17,
    ));`;

    await expect(compile(failureInput)).rejects.toThrowError();
  });
});
