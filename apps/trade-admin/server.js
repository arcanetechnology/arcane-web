/** @format */
const http = require('http');
const url = require('url');
const fs = require('fs');
const pkg = require('./package.json');

const PORT = 3000;

const server = http.createServer((req, res) => {
  const pathname = url.parse(req.url).pathname;
  const jsHeader = {
    'Content-Type': 'application/javascript',
    'Access-Control-Allow-Origin': '*',
  };
  switch (pathname) {
    case '/trade-admin.js':
      res.writeHead(200, jsHeader);
      return fs.createReadStream('./dist/trade-admin.js').pipe(res);
    default:
      res.writeHead(200, {
        'Content-Type': 'text/html',
        Link: `<http://localhost:${PORT}/trade-admin.js>; rel="fragment-script"`,
      });
      return res.end('');
  }
});

server.listen(PORT, () => {
  console.log(
    `⚡️[${pkg.name}]: Server is running at https://localhost:${PORT}`
  );
});
