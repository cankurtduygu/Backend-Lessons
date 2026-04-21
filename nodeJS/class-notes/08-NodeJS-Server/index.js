"use strict";
/* -------------------------------------- *

                NODEJS

/* -------------------------------------- */
//? HTTPSERVER:

const http = require("node:http"); // built-in module

/* -------------------------------------- *
// http.createServer((request, response)=> {...})

// http
//   .createServer((request, response) => {
//     console.log("console print");
//     response.end("Hello CH11");
//   })
//   .listen(8000, () => console.log("Server Started: http://localhost:8000"));

const app = http.createServer((request, response) => {
  console.log("console print");
  response.end("Hello CH11");
});

// Defaul server domain (local domain)
// Default server ip (local ip) = 127.0.0.1
app.listen(8000, () =>
  console.log("Server Started: http://localhost:8000"),
);

/* -------------------------------------- *
//* Route in nodejs

const app = http.createServer((req, res) => {
  // console.log("req=", req);
  // console.log('res=', res);
  // console.log(req.url);

    res.write('first line data ')
    res.write('second line data ')
    res.write('third line data ')

  if (req.url == "/") {
    res.end("Main data");
  } else if (req.url == "/users") {
    res.end("Users data");
  } else if (req.url == "/firms") {
    res.end("Firms data");
  } else{
    res.end('other data')
  }

  // res.end("Hello CH11"); you can not use anything else after 'end' event.
});

app.listen(8000, () => console.log("Server Started: http://localhost:8000"));

/* -------------------------------------- */
//* Mini Server Logic
// $ npm install dotenv

let items = [
  { id: 1, name: "learn nodejs server" },
  { id: 2, name: "be expert on express" },
];

require("dotenv").config(); // .env dosyasindaki verileri process.env icine yukler
const PORT = process.env.PORT ?? 8000; // eger ki .env icinde port yoksa default deger 8000 ata.

// Helper: Parse Json body (nodejs way)
function parseRequestBody(req, callback) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    try {
      callback(null, JSON.parse(body));
    } catch (err) {
      callback(err);
    }
  });
}

const server = http.createServer((req, res) => {
  // console.log(req.url);
  // console.log(req.method);

  // routing
  // todo item icin ozel okuma. items/1 response-> sadece istenilen item bilgisini dondur
  if (req.url == "/" && req.method == "GET") {
    // Home route

    // res.writeHead(400, 'hatali istek') // ilk parametre status code(default: 200), ikinci parametre istege bagli olarak status message(default: status code message)
    res.writeHead(200);

    res.end(
      JSON.stringify({
        error: false,
        message: "welcome to nodejs mini server",
      }),
    );
  } else if (req.url == "/items" && req.method == "GET") {
    // READ: list all items
    // res.writeHead(200);

    res.end(
      JSON.stringify({
        error: false,
        data: items,
      }),
    );
  } else if (req.url == "/items" && req.method == "POST") {
    // CREATE: Add new item
    parseRequestBody(req, (err, data) => {
      if (err || !data.name) {
        res.writeHead(400);
        return res.end(
          JSON.stringify({
            error: true,
            message: "invalid json format or missing name",
          }),
        );
      }

      const newItem = { id: Date.now(), name: data.name };
      items.push(newItem);

      res.writeHead(201);
      res.end(JSON.stringify({ error: false, message: "new data created" }));
    });
  } else if (req.url.match(/^\/items\/(\d+)$/) && req.method == "PUT") {
    // gonderilen id almaniz gerekiyor
    // console.log(Number(req.url.split('/')[2]));
    const id = Number(req.url.split("/")[2]);
    const item = items.find((i) => i.id === id);

    // item bulmak lazim eger ki yoksa kullanica hata response verilmeli
    if (!item) {
      res.writeHead(404);
      return res.end(
        JSON.stringify({ error: true, message: "Item not found." }),
      );
    }
    // console.log(item);

    parseRequestBody(req, (err, data) => {
      if (err || !data.name) {
        res.writeHead(400);
        return res.end(
          JSON.stringify({
            error: true,
            message: "invalid json format or missing name",
          }),
        );
      }

      // item update edip kullaniciya updated edilmis item
      item.name = data.name;
      res.writeHead(200);
      res.end(JSON.stringify({ error: false, data: item }));
    });
  } else if (req.url.match(/^\/items\/(\d+)$/) && req.method == "DELETE") {
    // DELETE: remove an item

    const id = Number(req.url.split("/")[2]);
    const index = items.findIndex((i) => i.id === id);

    if (index === -1) {
      res.writeHead(404);
      return res.end(
        JSON.stringify({ error: true, message: "Item not found" }),
      );
    }

    items = items.filter((i) => i.id != id);

    res.writeHead(200);
    res.end(
      JSON.stringify({ error: false, message: "Item has been deleted." }),
    );
  } else {
    // 404 for all other routes
    res.writeHead(404);
    res.end(JSON.stringify({ error: true, message: "Route Not Found" }));
  }
});

server.listen(PORT, () =>
  console.log(`server started: http://127.0.0.1:${PORT}`),
);

/* -------------------------------------- */
// ? NOTES:
// - Nodejs core does not auto-parse JSON bodies
// - Each request/response must be ended with res.end()
