/** @format */

import { renderToString, HydrationScript } from 'solid-js/web';
import App from './App';

export function render() {
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
          src={`https://www.googletagmanager.com/gtag/js?id=${
            import.meta.env.VITE_GTAG_ID
          }`}
        ></script>
        <link
          rel="icon"
          type="image/png"
          href="http://example.com/favicon.png"
        ></link>
        {`<script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('config', '${import.meta.env.VITE_GTAG_ID}');
          gtag('consent', 'default', {
            ad_storage: 'denied',
            analytics_storage: 'denied',
          });
        </script>`}
        <HydrationScript />
      </head>
      <body>
        <App />
      </body>
    </html>
  ));
  return { body };
}
