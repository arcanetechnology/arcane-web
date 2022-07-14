/** @format */

import type { VoidComponent } from 'solid-js';
import { HydrationScript } from 'solid-js/web';
import App from '../src/App';

type DocumentProps = {
  url?: string;
};

const Document: VoidComponent<DocumentProps> = (props) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <HydrationScript />
        <script src="/js/client.js" type="module" />
      </head>
      <body>
        <App url={props.url ?? '/'} />
      </body>
    </html>
  );
};

export default Document;
