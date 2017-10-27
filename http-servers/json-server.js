import http from "http";

const pojo = {
  id: 1,
  name: 'Supreme T-Shirt',
  brand: 'Supreme',
  price: 99.99,
  options: [{
    color: 'blue'
  }, {
    size: 'XL'
  }]
};
const port = '8080';

http.createServer()
  .on('request', (req, res) => {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(pojo));
  })
  .listen(port, () => console.log(`Serever listening on port ${port}`))