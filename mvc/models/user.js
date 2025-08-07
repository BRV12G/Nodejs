const mongoose = require("mongoose");

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

module.exports = User;