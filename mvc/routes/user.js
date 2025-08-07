const express = require("express");
const router = express.Router(); // importing the router module so that we can create routes at the router level
const {handleGetAllUsers, handleGetUserById, handleUpdateUserById, handleDeleteUserById, handlePostUser} = require("../controllers/user");


router
.route("/")
.get(handleGetAllUsers) // getting all users
.post(handlePostUser); // creating a new user


//merging routes
router
  .route("/:id") 
  .get(handleGetUserById) // getting a user by id
  .patch(handleUpdateUserById) // updating a user
  .delete(handleDeleteUserById); // deleting a user


  module.exports = router;