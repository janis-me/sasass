import { describe, expect, it } from 'vitest';

import { compile } from './utils/compile';

const BASE_INPUT = `
@use 'surimi/index.scss' as s;
`;

describe('list validator', () => {
  it('creates a list validator correctly', async () => {
    const input = `${BASE_INPUT}
    $list-schema: s.list(s.number($min: 1, $max: 10));`;

    await expect(compile(input)).resolves.toBeDefined();
  });

  it('validates lists correctly', async () => {
    const input = `${BASE_INPUT}
    $list-schema: s.list(s.number($min: 1, $max: 10), $unique: true);

    @include s.validate($list-schema, (
      5,
      10,
      5,
    ));`;

    await expect(compile(input)).rejects.toThrowError(
      `"[surimi] List must contain only unique items, but \`5\` is a duplicate"`,
    );
  });

  it('passes on valid sub-schema', async () => {
    const baseInput = `${BASE_INPUT}
    $list-schema: s.list(s.number($min: 1, $max: 10));`;

    const successInput = `${baseInput}
    @include s.validate($list-schema, (
      5,
      10,
    ));`;

    await expect(compile(successInput)).resolves.toBeDefined();
  });

  it('throws on sub-schema error', async () => {
    const baseInput = `${BASE_INPUT}
    $list-schema: s.list(s.number($min: 1, $max: 10));`;

    const failureInput = `${baseInput}
    @include s.validate($list-schema, (
      0,
      11,
    ));`;

    await expect(compile(failureInput)).rejects.toThrowError(
      `"[surimi] List items must be greater than or equal to \`1\`"`,
    );
  });
});
