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

  it('validates the whole map correctly', async () => {
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

    const failingInput1 = `${baseInput}
    @include s.validate($map-schema, (
      'name': 'surimi',
      'age': 17,
    ));`;

    await expect(compile(failingInput1)).rejects.toThrow(`"[surimi] Map.age must be greater than or equal to \`18\`"`);

    const failingInput2 = `${baseInput}
    @include s.validate($map-schema, (
      'name': 'not-surimi',
      'age': 30,
    ));`;
    await expect(compile(failingInput2)).rejects.toThrow(`"[surimi] Map.name must be equal to \`surimi\`"`);
  });
});
