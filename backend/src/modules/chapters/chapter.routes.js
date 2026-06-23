const express = require("express");

const chapterController = require("./chapter.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const requireRole = require("../../middlewares/role.middleware");
const rateLimit = require("../../middlewares/rateLimit.middleware");
const validate = require("../../middlewares/validate.middleware");
const { chapterSchema } = require("./chapter.schema");
const commentController = require("../comments/comment.controller");
const { createCommentSchema } = require("../comments/comment.schema");

const router = express.Router();
const commentRateLimit = rateLimit({ max: 45, keyPrefix: "chapter-comments" });

router.get("/manga/:mangaId", chapterController.getChaptersByManga);
router.get("/:chapterId/comments", commentController.getCommentsByChapter);
router.post("/:chapterId/comments", authMiddleware, commentRateLimit, validate(createCommentSchema), commentController.createChapterComment);
router.get("/:chapterId", chapterController.getChapterById);
router.post("/", authMiddleware, requireRole("ADMIN", "MODERATOR"), validate(chapterSchema), chapterController.createChapter);
router.put("/:id", authMiddleware, requireRole("ADMIN", "MODERATOR"), validate(chapterSchema.partial()), chapterController.updateChapter);
router.delete("/:id", authMiddleware, requireRole("ADMIN"), chapterController.deleteChapter);

module.exports = router;
