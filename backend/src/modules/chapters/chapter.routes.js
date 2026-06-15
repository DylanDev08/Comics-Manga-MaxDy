const express = require("express");
const chapterController = require("./chapter.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

const router = express.Router();

router.get("/manga/:mangaId", chapterController.getChaptersByManga);
router.post("/", authMiddleware, chapterController.createChapter);
router.put("/:id", authMiddleware, chapterController.updateChapter);
router.delete("/:id", authMiddleware, chapterController.deleteChapter);

module.exports = router;