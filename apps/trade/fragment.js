/** @format */

const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const pathname = url.parse(req.url).pathname;
  const jsHeader = { 'Content-Type': 'application/javascript' };
  switch (pathname) {
    case '/index.js':
      res.writeHead(200, jsHeader);
      return fs.createReadStream('./dist/index.js').pipe(res);
    default:
      res.writeHead(200, {
        'Content-Type': 'text/html',
        Link: '<http://localhost:8081/index.js>; rel="fragment-script"',
      });
      res.end('<div id="arcane-app"></div>');
  }
});

server.listen(8081, () => {
  console.log('SPA Fragment Server started at 8081');
});
