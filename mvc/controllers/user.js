const User = require("../models/user");

// get all users
async function handleGetAllUsers(req, res) {
  try {
    const dbusers = await User.find({});
    if (!dbusers) {
      return res
        .status(404)
        .json({ message: "error", message: "users not found" });
    }
    return res
      .status(200)
      .json({ message: "success", data: { users: dbusers } });
  } catch (err) {
    return res.status(500).json({ message: "error", message: err.message });
  }
}

// get user by ID
async function handleGetUserById(req, res) {
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
}

//update users
async function handleUpdateUserById(req, res) {
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
}

//  delete user by id
async function handleDeleteUserById(req, res) {
  try {
    const dbuser = await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "success", user: dbuser });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
}

async function handlePostUser(req, res) {
  try {
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
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handlePostUser
};
