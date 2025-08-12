const User = require("../models/user");
const URL = require("../models/url");
const {v4: uuidv4} = require("uuid");
const {setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;
    await User.create({
      name,
      email,
      password,
    });
    const allUrls = await URL.find({});
    return res.render("home2", { url: allUrls });
  } catch (err) {
    return res.status(500).json({ message: "error", error: err.message });
  }
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).render("login", { error: "user not found" });
    }
    const sessionID = uuidv4();
    setUser(sessionID, user);
    res.cookie("sessionID", sessionID);
    return res.redirect("/static");
  } catch (err) {
    return res.status(500).json({ message: "error", error: err.message });
  }
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
