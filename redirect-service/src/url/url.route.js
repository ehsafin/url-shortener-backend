const express = require("express");
const router = express.Router();
const urlController = require("./url.controller");

router.get("/:shortCode", urlController.redirectToOriginalUrl);

module.exports = router;
