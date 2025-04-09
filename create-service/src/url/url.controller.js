const urlService = require("./url.service");

exports.createShortUrl = async (req, res) => {
  const { originalUrl, alias, expirationTime } = req.body;
  try {
    const shortUrl = await urlService.createShortUrl(
      originalUrl,
      alias,
      expirationTime
    );
    res.status(201).json({ shortUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.redirectToOriginalUrl = async (req, res) => {
  const { shortCode } = req.params;
  try {
    const originalUrl = await urlService.getOriginalUrl(shortCode);
    if (!originalUrl)
      return res.status(404).json({ error: "Short URL not found" });
    res.redirect(originalUrl);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
