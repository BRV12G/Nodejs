const http = require("http");
const url = require("url");

const myServer = http.createServer((req, res) => {
  const myUrl = url.parse(req.url, true);
  switch (myUrl.pathname) {
    case "/":
      if (req.method === "GET") res.end("Home page");
      break;
    case "/signup":
      if (req.method === "GET") {
        res.end("signup up page");
      } else if (req.method === "POST") {
        res.end("sucess signup");
      }
      break;
    default:
      res.end("page not found");
  }
});

myServer.listen(8000, () => {
  console.log(
    "server is listening on port 8000 displayed on terminal when we run the server"
  );
});
