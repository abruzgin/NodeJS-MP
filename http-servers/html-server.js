import http from "http";
import fs from "fs";
import through2 from "through2";

const port = '8080';
http.createServer()
  .on('request', (req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/html"
    });

    // read file with fs.readFileSync
    // const html = fs.readFileSync("./index.html")
    //   .toString()
    //   .replace('{message}', 'Hello World!');
    // res.end(html);

    // read file with readable stream
    const readable = fs.createReadStream("./index.html");
    readable
      .pipe(through2(function(chunk, enc, cb) {
        const str = chunk
          .toString()
          .replace('{message}', 'Hello World!');
        this.push(replaced);
        cb();
      }))
      .pipe(res)
  })
  .listen(port, () => console.log(`Serever listening on port ${port}`))