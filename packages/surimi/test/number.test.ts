import { describe, expect, it } from 'vitest';

import { compile } from './utils/compile';

const BASE_INPUT = `
@use 'surimi/index.scss' as s;
`;

const numberOptions = ['eq', 'ne', 'gt', 'lt', 'gte', 'lte'];
const numberAliases = ['min', 'max'];
const listOptions = ['in', 'not-in'];
const allOptions = [...numberOptions, ...listOptions, ...numberAliases];

describe('number validator', () => {
  it('creates a number validator correctly', async () => {
    const input = `${BASE_INPUT}
        $number-schema: s.number($gte: 18);
      `;

    await expect(compile(input)).resolves.toBeDefined();
  });

  it('accepts a label', async () => {
    const input = `${BASE_INPUT}
        $number-schema: s.number($gte: 18, $label: 'Age');
      `;

    await expect(compile(input)).resolves.toBeDefined();
  });

  it('shows the correct label', async () => {
    const input = `${BASE_INPUT}
        $number-schema: s.number($gte: 18, $label: 'Age');

        @include s.validate($number-schema, 17);
      `;

    await expect(compile(input)).rejects.toThrow(`"[surimi] Age must be greater than or equal to \`18\`"`);
  });

  describe('options', () => {
    describe('number-based options', () => {
      numberOptions.forEach(option => {
        describe(`option '${option}'`, () => {
          it(`accepts the '${option}' option`, async () => {
            const input = `${BASE_INPUT}
            $number-schema: s.number($${option}: 42);
          `;

            await expect(compile(input)).resolves.toBeDefined();
          });

          it('throw on invalid input type', async () => {
            const input = `${BASE_INPUT}
            $number-schema: s.number($${option}: 'forty-two');
            @include s.validate($number-schema, 42);
          `;
            await expect(compile(input)).rejects.toThrowError(
              `"[surimi] number.${option} expects a number, got \`forty-two\` (string)"`,
            );
          });
        });
      });

      numberAliases.forEach(alias => {
        it(`accepts the '${alias}' alias`, async () => {
          const input = `${BASE_INPUT}
            $number-schema: s.number($${alias}: 18);
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
            $number-schema: s.number($${option}: (18, 19));
          `;

            await expect(compile(input)).resolves.toBeDefined();
          });

          it('throws on invalid input type', async () => {
            const input = `${BASE_INPUT}
            $number-schema: s.number($${option}: 42);
            @include s.validate($number-schema, 42);
          `;
            await expect(compile(input)).rejects.toThrowError(
              `"[surimi] number.${option} expects a list, got \`42\` (number)"`,
            );
          });

          it('throws on invalid list item type', async () => {
            const input = `${BASE_INPUT}
            $number-schema: s.number($${option}: (18 'nineteen'));
            @include s.validate($number-schema, 18);
          `;
            await expect(compile(input)).rejects.toThrowError(
              `"[surimi] number.${option} expects a list of numbers, but one was \`nineteen\` (string)"`,
            );
          });
        });
      });
    });

    describe('invalid options', () => {
      it('throws on invalid option', async () => {
        const input = `${BASE_INPUT}
            $number-schema: s.number($invalid: 42);
          `;

        await expect(compile(input)).rejects.toThrowError(
          `"[surimi] \`number.invalid\` is not a valid validator. Allowed validators are: [${allOptions.join(' ')}]`,
        );
      });
    });
  });
});
