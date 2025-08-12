const express = require("express");
const router = express.Router();
const {handleUserSignup, handleUserLogin} = require("../controllers/user");

router.post("/signup", handleUserSignup);

router.post("/login", handleUserLogin);


router.get("/signup", (req, res) => {
    return res.render("signup");
})

router.get("/login", (req, res) => {
    return res.render("login");
})

module.exports = router;