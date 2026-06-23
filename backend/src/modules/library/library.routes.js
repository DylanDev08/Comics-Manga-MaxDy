const express = require("express");

const authMiddleware = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");
const libraryController = require("./library.controller");
const { librarySchema } = require("./library.schema");

const router = express.Router();

router.get("/", authMiddleware, libraryController.getLibrary);
router.post("/", authMiddleware, validate(librarySchema), libraryController.upsertLibraryItem);
router.post("/:mangaId", authMiddleware, validate(librarySchema.omit({ mangaId: true }).partial()), libraryController.upsertLibraryItem);
router.delete("/:mangaId", authMiddleware, libraryController.removeLibraryItem);

module.exports = router;
