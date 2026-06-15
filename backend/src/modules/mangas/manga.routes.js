const express = require("express");
const mangaController = require("./manga.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

const router = express.Router();

router.get("/", mangaController.getAllMangas);
router.get("/:id", mangaController.getMangaById);
router.post("/", authMiddleware, mangaController.createManga);
router.put("/:id", authMiddleware, mangaController.updateManga);
router.delete("/:id", authMiddleware, mangaController.deleteManga);

module.exports = router;