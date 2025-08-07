const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8000;

//connecting to the database
mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() => console.log("connected to database"))
  .catch((err) => console.log("Mongo error", err));

//schema
const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String },
    email: { type: String, required: true, unique: true },
    gender: { type: String },
    job_title: { type: String },
  },
  { timestamps: true } // adding timestamps
);

// models for the database based on the schema
const User = mongoose.model("user", userSchema);
const departments = mongoose.model("department", userSchema);

//middleware to get the body of the request from postman in urlencoded format
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // <-- this is the fix

// creating a new user
app.post("/api/users", async (req, res) => {
  const body = req.body; // getting the body of the request
  console.log(body);
  if (
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res
      .status(400)
      .json({ status: "error", message: "all fields are required" });
  } // adding the user to the list
  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title,
  });
  console.log(result);
  return res.status(201).json({ status: "sucesss", id: result._id });
});

//dynamically creating a list of users, sending response as html
app.get("/users", async (req, res) => {
  const dbusers = await User.find({});
  const html = `
    <ul>
    ${dbusers
      .map((u) => `<li>${u.first_name} - ${u.last_name} - ${u.email}</li>`)
      .join("")} 
    </ul>
    `; // dynamically creating a list of users
  res.send(html);
});

//route to get users from database
app.get("/api/users", async (req, res) => {
  const dbusers = await User.find({});
  return res.json(dbusers);
});

//merging routes
app
  .route("/api/users/:id")
  .get(async (req, res) => {
    try {
      const dbuser = await User.findById(req.params.id);
      if (!dbuser) {
        return res
          .status(404)
          .json({ status: "error", message: "user not found" });
      }
      return res.json(dbuser);
    } catch (err) {
      return res.status(500).json({ status: "error", message: err.message });
    }
  })
  .patch(async (req, res) => {
    try {
      const result = {
        // updating the user
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender,
        job_title: req.body.job_title,
      };
      const dbuser = await User.findByIdAndUpdate(req.params.id, result, {
        new: true, // return the updated document instead of the original as mongoose will return the original by default
        runValidators: true, // run the validators because we are updating the document and mongoose will not run the validators by default
      });

      if (!dbuser) {
        return res
          .status(404)
          .json({ status: "error", message: "user not found" });
      }
      return res.json(dbuser ? dbuser : dbuser);
    } catch (err) {
      return res.status(500).json({ status: "error", message: err.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const dbuser = await User.findByIdAndDelete(req.params.id); 
      return res.json({ status: "success", user: dbuser });
    } catch (err) {
      return res.status(500).json({ status: "error", message: err.message });
    }
  });

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
