const express = require("express");
const router = express.Router();
const {handleGenerateNewShortURL, handleGetURlByID, handleGetAnalytics, ssrUsingEjs} = require("../controllers/url")


// creating a new short url
router.post("/", handleGenerateNewShortURL);

router.route("/:shortId")
.get(handleGetURlByID) //getting a short url by id and incrementing the visit history

router.get("/analytics/:shortId", handleGetAnalytics) // getting analytics of a short url

router.get("/", ssrUsingEjs) // ssr using ejs for the url

module.exports = router;