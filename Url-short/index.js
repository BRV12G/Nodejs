// main page
const express = require("express");
const app = express();
const PORT = 8001;
const URLRoute = require("./routes/url");
const { connectToMongoDb } = require("./config/connect"); //loading configrations --> connecting to the database

//connecting to the database
connectToMongoDb("mongodb://127.0.0.1:27017/URL-shortner");

//middleware
app.use(express.json());

//routes for the urls
app.use("/api/url", URLRoute)


//connecting a port to the server
app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
})

