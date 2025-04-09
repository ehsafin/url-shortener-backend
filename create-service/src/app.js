const express = require("express");
const urlRoute = require("./url/url.route");
const app = express();

app.use(express.json());

app.get("/health", (req, res) => res.status(200).send("OK"));

app.use("/api", urlRoute);

module.exports = app;
