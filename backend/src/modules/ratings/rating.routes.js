const express = require("express");

const authMiddleware = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");
const ratingController = require("./rating.controller");
const { ratingSchema } = require("./rating.schema");

const router = express.Router();

router.post("/:mangaId", authMiddleware, validate(ratingSchema), ratingController.upsertRating);

module.exports = router;
