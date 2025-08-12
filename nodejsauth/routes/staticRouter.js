const express = require("express");
const {handleSsrStaticRoute} = require("../controllers/url");

const router = express.Router();

router.get("/" , handleSsrStaticRoute);

module.exports = router;