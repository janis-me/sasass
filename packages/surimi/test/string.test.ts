import { describe, expect, it } from 'vitest';

import { compile } from './utils/compile';

const BASE_INPUT = `
@use 'surimi/index.scss' as s;
`;

const stringOptions = [
  'eq',
  'ne',
  'contains',
  'not-contains',
  'starts-with',
  'ends-with',
  'not-starts-with',
  'not-ends-with',
];
const numberOptions = ['max-length', 'min-length'];
const numberAliases = ['min', 'max'];
const listOptions = ['in', 'not-in'];
const allOptions = [...stringOptions, ...numberOptions, ...listOptions, ...numberAliases];

describe('string validator', () => {
  it('creates a string validator correctly', async () => {
    const input = `${BASE_INPUT}
        $string-schema: s.string($eq: 'surimi');
      `;

    await expect(compile(input)).resolves.toBeDefined();
  });

  it('accepts a label', async () => {
    const input = `${BASE_INPUT}
        $string-schema: s.string($eq: 'surimi', $label: 'Name');
      `;

    await expect(compile(input)).resolves.toBeDefined();
  });

  it('shows the correct label', async () => {
    const input = `${BASE_INPUT}
        $string-schema: s.string($eq: 'surimi', $label: 'Name');

        @include s.validate($string-schema, 'test');
      `;

    await expect(compile(input)).rejects.toThrow(`"[surimi] Name must be equal to \`surimi\`"`);
  });

  describe('options', () => {
    describe('string-based options', () => {
      stringOptions.forEach(option => {
        describe(`option '${option}'`, () => {
          it(`accepts the '${option}' option`, async () => {
            const input = `${BASE_INPUT}
            $string-schema: s.string($${option}: 'surimi');
          `;

            await expect(compile(input)).resolves.toBeDefined();
          });

          it('throw on invalid input type', async () => {
            const input = `${BASE_INPUT}
            $string-schema: s.string($${option}: 42);
            @include s.validate($string-schema, '42');
          `;
            await expect(compile(input)).rejects.toThrowError(
              `"[surimi] string.${option} expects a string, got \`42\` (number)"`,
            );
          });
        });
      });
    });

    describe('number-based options', () => {
      numberOptions.forEach(option => {
        describe(`option '${option}'`, () => {
          it(`accepts the '${option}' option`, async () => {
            const input = `${BASE_INPUT}
            $string-schema: s.string($${option}: 10);
          `;

            await expect(compile(input)).resolves.toBeDefined();
          });

          it('throw on invalid input type', async () => {
            const input = `${BASE_INPUT}
            $string-schema: s.string($${option}: '10');
            @include s.validate($string-schema, '10');
          `;
            await expect(compile(input)).rejects.toThrowError(
              `"[surimi] string.${option} expects a number, got \`10\` (string)"`,
            );
          });
        });
      });

      numberAliases.forEach(alias => {
        it(`accepts the '${alias}' alias`, async () => {
          const input = `${BASE_INPUT}
            $string-schema: s.string($${alias}: 10);
          `;

          await expect(compile(input)).resolves.toBeDefined();
        });
      });
    });

    describe('list-based options', () => {
      listOptions.forEach(option => {
        describe(`option '${option}'`, () => {
          it(`accepts the '${option}' option`, async () => {
            const input = `${BASE_INPUT}
            $string-schema: s.string($${option}: ('surimi', 'tofu'));
          `;

            await expect(compile(input)).resolves.toBeDefined();
          });

          it('throw on invalid input type', async () => {
            const input = `${BASE_INPUT}
            $string-schema: s.string($${option}: 'surimi');
            @include s.validate($string-schema, 'surimi');
          `;
            await expect(compile(input)).rejects.toThrowError(
              `"[surimi] string.${option} expects a list, got \`surimi\` (string)"`,
            );
          });
        });
      });
    });

    describe('invalid options', () => {
      it('throws on invalid option', async () => {
        const input = `${BASE_INPUT}
            $string-schema: s.string($invalid: 42);
          `;

        await expect(compile(input)).rejects.toThrowError(
          `"[surimi] \`string.invalid\` is not a valid validator. Allowed validators are: [${allOptions.join(' ')}]`,
        );
      });
    });
  });
});
