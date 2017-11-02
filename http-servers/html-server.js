import http from "http";
import fs from "fs";
import through2 from "through2";

const port = '8080';
http.createServer()
  .on('request', (req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/html"
    });
    const readable = fs.createReadStream("./index.html");
    readable
      .pipe(through2(function(chunk, enc, cb) {
        const str = chunk
          .toString()
          .replace('{message}', 'Hello World!');
        this.push(str);
        cb();
      }))
      .pipe(res)
  })
  .listen(port, () => console.log(`Serever listening on port ${port}`))