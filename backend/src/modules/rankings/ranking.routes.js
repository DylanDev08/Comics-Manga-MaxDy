const express = require("express");

const rankingController = require("./ranking.controller");

const router = express.Router();

router.get("/", rankingController.getRankings);

module.exports = router;
