// main page
const express = require("express");
const app = express();
const PORT = 8001;
const URLRoute = require("./routes/url");
const path = require("path");
const { connectToMongoDb } = require("./config/connect"); //loading configrations --> connecting to the database
const staticRoute = require("./routes/staticRouter");
//connecting to the database
connectToMongoDb("mongodb://127.0.0.1:27017/URL-shortner");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes for the urls
app.use("/api/url", URLRoute)

app.use("/ssr" , URLRoute);

app.use("/static" , staticRoute);


//connecting a port to the server
app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
})

