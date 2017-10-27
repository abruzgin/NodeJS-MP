import http from "http";

const port = '8080';
http.createServer()
  .on('request', (req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/plain"
    });
    res.end('Hello World!')
  })
  .listen(port, () => console.log(`Serever listening on port ${port}`));