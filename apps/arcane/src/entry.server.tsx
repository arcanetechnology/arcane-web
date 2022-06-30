/** @format */

import { renderToStringAsync, generateHydrationScript } from 'solid-js/web';
import devalue from 'devalue';
import { createApp } from './app';

export async function render(url: string) {
  const renderPromise = renderToStringAsync(() => createApp({ url }));

  return {
    appHtml: await renderPromise,
    hydration: `<script>window.hydration = ${devalue({ url })}</script>`,
    hydrationScript: generateHydrationScript(),
  };
}
