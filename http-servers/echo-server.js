import http from "http";
import url from "url";

const port = '8080';
http.createServer((req,res) => {
  res.writeHead(200, {
    "Content-Type": "text/plain"
  });
  res.on("finish", () => console.log('response sent'));
  req.pipe(res);
 })
  .listen(port, () => console.log(`Serever listening on port ${port}`));