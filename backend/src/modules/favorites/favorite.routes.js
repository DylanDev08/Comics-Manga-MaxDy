const express = require("express");
const favoriteController = require("./favorite.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

const router = express.Router();

router.get("/", authMiddleware, favoriteController.getUserFavorites);
router.post("/", authMiddleware, favoriteController.addFavorite);
router.delete("/:mangaId", authMiddleware, favoriteController.removeFavorite);

module.exports = router;