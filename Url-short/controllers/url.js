const URL = require("../models/url");
const { nanoid } = require("nanoid");

// creating a new short url
async function handleGenerateNewShortURL(req, res) {
  try {
    const body = req.body;
    if (!body.url) return res.status(400).json({ message: "url not found!" });
    const shortID = nanoid(8); // genrates a unique id
    await URL.create({
      shortId: shortID,
      redirectURL: body.url,
      visitHistory: [],
    });
    console.log(body);
    return res.status(201).json({ message: "success", id: shortID });
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
   return res.status(200).json({ message: "success" }).redirect(entry.redirectURL);
  } catch (err) {
    return res.status(500).json({ message: "error", error: err.message });
  }
}


async function handleGetAnalytics(req, res){
    try {
        const shortId = req.params.shortId;
        const result = await URL.findOne({shortId});
        return res.status(200).json({
            totalClicks: result.visitHistory.length,
            analytics: result.visitHistory
        })

    }
    catch(err){
        return res.status(500).json({ message: "error", error: err.message });

    }
}

module.exports = { handleGenerateNewShortURL, handleGetURlByID, handleGetAnalytics };
