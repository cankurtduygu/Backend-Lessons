// request -> server -> response (olumlu - olumsuz)
const http = require('http');

//!REQUEST VE RESPONSE ASLINDA CRETAE SERVER ICINDEKI IK TANE PARAMETRE
const server = http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      res.end('ana sayfa');
      break;
    case '/about':
      res.end('hakkimda sayfasi');
      break;
    default:
      res.end('404- sayfa bulunamadi');
  }
});

server.listen(8000, () => {
  console.log('server calisti : 8000');
});
