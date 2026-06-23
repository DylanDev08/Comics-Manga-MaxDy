const express = require("express");

const authMiddleware = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");
const progressController = require("./progress.controller");
const { progressSchema } = require("./progress.schema");

const router = express.Router();

router.patch("/:mangaId", authMiddleware, validate(progressSchema), progressController.upsertProgress);

module.exports = router;
