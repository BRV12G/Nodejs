const express2 = require("express"); // importing the express module

const app = express2(); // creating an instance of the express module

app.get("/", (req, res) => { // creating a route for the home page
    return res.send("hello from home page");
})

app.get("/about", (req, res) => { // creating a route for the about page with query parameters
    return res.send("hello from about page my name is " + req.query.name + " and my age is " + req.query.age);
})

app.listen(8000, () => { // connecting a port to the server using the express module
    console.log("server is listening on port 8000 using express and we donot need http");
});
