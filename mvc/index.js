const express = require("express");
const app = express();
const PORT = 8000;
const userRouter = require("./routes/user"); // impoting the user router module 
const { connectMongoDb } = require("./config/db"); //loading configrations --> connecting to the database

//connecting to the database
connectMongoDb("mongodb://127.0.0.1:27017/test2");

//index page should import middlewares
//middleware to get the body of the request from postman in urlencoded format 
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 


//routes for the users present in the routes/user.js
app.use("/api/users", userRouter);


app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
