const express = require("express");
const router = express.Router();
const urlController = require("./url.controller");

router.post("/shorten", urlController.createShortUrl);
// router.get("/:shortCode", urlController.redirectToOriginalUrl);

module.exports = router;
