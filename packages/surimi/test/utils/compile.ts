import { resolve } from 'node:path';
import * as sass from 'sass';

export async function compile(input: string): Promise<sass.CompileResult> {
  const res = await sass.compileStringAsync(input, {
    style: 'compressed',
    importers: [
      {
        findFileUrl(url) {
          if (!url.startsWith('surimi')) return null;
          const path = url.replace('surimi', 'src');
          const a = new URL(resolve(__dirname, `../../${path}`), import.meta.url);
          return a;
        },
      },
    ],
  });

  return res;
}
