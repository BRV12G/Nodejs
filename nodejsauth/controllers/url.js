const URL = require("../models/url");
const { nanoid } = require("nanoid");
const { all } = require("../routes/url");

// creating a new short url
async function handleGenerateNewShortURL(req, res) {
  try {
    const body = req.body;
    if (!body.url) return res.status(400).json({ message: "url not found!" });
    const shortID = nanoid(8); // genrates a unique id
    const allUrls = await URL.find({});
    await URL.create({
      shortId: shortID,
      redirectURL: body.url,
      visitHistory: [],
      createdBy: req.user._id,
    });
    console.log(body);
    return res.render("home2", {id: shortID, url: allUrls})
    // .status(201).json({ message: "success", id: shortID });
  } catch (err) {
    return res.status(500).json({ message: "error", error: err.message });
  }
}

async function handleGetURlByID(req, res) {
  try {
    const body = req.body;
    console.log(req.params.shortId);
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: { timestamp: Date.now() },
        },
      }
    );
    return res
      .redirect(entry.redirectURL)
      // .status(200)
      // .json({ message: "successful", data: entry.shortId });
  } catch (err) {
    return res.status(500).json({ message: "error", error: err.message });
  }
}

async function handleGetAnalytics(req, res) {
  try {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.status(200).json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  } catch (err) {
    return res.status(500).json({ message: "error", error: err.message });
  }
}

// server side rendering using ejs

async function ssrUsingEjs(req, res) {
  try {
    const allUrls = await URL.find({});
    return res.status(200).render("home", { url: allUrls });
  } catch (err) {
    return res.status(500).json({ message: "error", error: err.message });
  }
}

async function handleSsrStaticRoute(req, res) {
  try {
    const allUrls = await URL.find({});
    return res.render("home2", { url: allUrls });
  } catch (err) {
    return res.status(500).json({ message: "error", error: err.message });
  }
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetURlByID,
  handleGetAnalytics,
  ssrUsingEjs,
  handleSsrStaticRoute
};
