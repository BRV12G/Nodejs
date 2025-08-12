// main page
const express = require("express");
const app = express();
const PORT = 8001;
const URLRoute = require("./routes/url");
const path = require("path");
const { connectToMongoDb } = require("./config/connect"); //loading configrations --> connecting to the database
const staticRoute = require("./routes/staticRouter");
const userRouter = require("./routes/user"); // impoting the user router module
const cookieParser = require("cookie-parser");
const { restrictToLoggedinUserOnly} = require("./middlewares/auth")
//connecting to the database
connectToMongoDb("mongodb://127.0.0.1:27017/nodejsauth");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//routes for the urls
app.use("/api/url", restrictToLoggedinUserOnly, URLRoute)
// app.use("/ssr" , URLRoute);

app.use("/static" ,staticRoute);

//user routes
app.use("/api/user",  userRouter);


//connecting a port to the server
app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
})

