const url = require('url'); // url module
const http = require('http'); // http module


const myServer = http.createServer((req, res) => { // creating a server
  const myUrl = url.parse(req.url, true); // parsing the url and storing it in a variable myURL
  console.log(myUrl); // printing the  parsed url in the terminal  
  switch(myUrl.pathname){ // switch case for different pages
    case '/':  // home page
    res.end("Home page");
    break;
    case '/about':  // about page
    const username = myUrl.query.myname; // getting the username from the url and storing it in a variable username using query parameter
    res.end(`about page displayed on screen and username is ${username}`); // printing the username
    break;
    default: res.end("page not found");
  }
})

myServer.listen(8000, () => { // connecting a port to the server
    console.log("server is listening on port 8000 displayed on terminal when we run the server")
});