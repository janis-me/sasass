import { config as base, ConfigArray, tseslint } from '@janis.me/linter-config';

const config: ConfigArray = tseslint.config(base, {
  ignores: ['src'],
});

export default config;
