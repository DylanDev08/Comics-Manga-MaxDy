const express = require("express");
const genreController = require("./genre.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

const router = express.Router();

router.get("/", genreController.getAllGenres);
router.post("/", authMiddleware, genreController.createGenre);
router.put("/:id", authMiddleware, genreController.updateGenre);
router.delete("/:id", authMiddleware, genreController.deleteGenre);

module.exports = router;