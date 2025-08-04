const http = require('http');
const fs = require('fs');

//creating a server
const myServer = http.createServer( (req, res) => {
    // console.log("request received displayed on ternimal after we open the port on browser");
    const log = `${Date.now()}: New Request for ${req.url} and method ${req.method}\n`;
    fs.appendFile("log.txt", log, (err, data) => {
        switch(req.url){
            case '/': res.end("hello world displayed on screem");
            break;
            case '/favicon.ico': res.end("favicon displayed on screen");
            break;
            case '/about': res.end("about page displayed on screen");
            break;
            default: res.end("page not found");
        }
            
    })
});

//connecting a port to the server
myServer.listen(8000, () => {
    console.log("server is listening on port 8000 displayed on terminal when we run the server");
});