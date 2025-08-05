const express = require('express');
const users = require('./MOCK_DATA.json');
const fs = require('fs');
const app = express();
const PORT = 8000;

//routes
app.get("/api/users", (req, res) => {
    return res.json(users);
})

//middleware to get the body of the request from postman in urlencoded format
app.use(express.urlencoded({extended: true})); 

app.use((req, res, next) => {
    console.log("hello");
    // return res.json("hello");
    // Make changes to the request and the response objects.  
    next();  // calls the next middleware function inline either route or middleware
})

app.use((req, res, next) => {
    console.log("hello");
    next();
})

//merging routes
app.route("/api/users/:id")
.get((req, res) => {
    const id = Number(req.params.id); // getting the id from the URL,  converting it to a number since id is a string initially
    const user = users.find((u) =>  u.id === id); // finding the user with the id
    return res.json(user);
})
.patch((req, res) => {
     const body = req.body;
     const id = Number(req.params.id);
     console.log(body);
    const userIndex = users.findIndex((u) => u.id === id);
    // Update the user fields with the new values from body
    users[userIndex] = { ...users[userIndex], ...body };
    // Write the updated users array back to the file
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({ status: "success", user: users[userIndex] });
    });
})
.delete((req, res) => { // deleting the user
    const body = req.body;
     const id = Number(req.params.id);
     console.log(body);
     const userIndex = users.findIndex((u) => u.id === id);
     const deletedUser = users.splice(userIndex, 1);
     fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({ status: "success", user: deletedUser });
    });
});


// creating a new user
app.post("/api/users", (req, res) => {
    const body = req.body; // getting the body of the request
    console.log(body);
    users.push({...body, id: users.length + 1}); // adding the user to the list
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => { // writing the list to a file
            return res.json({status: "sucesss", id: users.length}); // returning the response
    });
})


app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
})


