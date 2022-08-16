/** @format */

import { renderToString, HydrationScript } from 'solid-js/web';
import utils from '@podium/utils';
import type { HttpIncoming } from '@podium/utils';

export function render(
  incoming: HttpIncoming<{
    [key: string]: unknown;
  }>,
  application: string
) {
  const body = renderToString(() => (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=`}
        ></script>
        {incoming.css.map(utils.buildLinkElement).join('\n')}
        <link
          rel="icon"
          type="image/png"
          href="http://example.com/favicon.png"
        ></link>
        {`<script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('config', '');
          gtag('consent', 'default', {
            ad_storage: 'denied',
            analytics_storage: 'denied',
          });
        </script>`}
        {incoming.js.map(utils.buildScriptElement).join('\n')}
        <HydrationScript />
      </head>
      <body>{application}</body>
    </html>
  ));
  return { body };
}
