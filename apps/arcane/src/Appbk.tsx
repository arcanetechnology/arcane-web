/** @format */

import { renderToString, HydrationScript } from 'solid-js/web';
import utils from '@podium/utils';
import type { HttpIncoming } from '@podium/utils';
import { Base } from './layouts';

export function render(
  incoming: HttpIncoming<{
    [key: string]: unknown;
  }>,
  header: string,
  footer: string
) {
  console.log(header);
  const body = renderToString(() => (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        {incoming.css.map(utils.buildLinkElement)}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=`}
        ></script>
        <link
          rel="icon"
          type="image/png"
          href="http://example.com/favicon.png"
        ></link>
        <script>
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('config', '');
          gtag('consent', 'default', {
            ad_storage: 'denied',
            analytics_storage: 'denied',
          });`}
        </script>
        <HydrationScript />
        {incoming.js.map(utils.buildScriptElement)}
      </head>
      <body>
        <Base header={header} footer={footer} />
      </body>
    </html>
  ));
  return { body };
}
