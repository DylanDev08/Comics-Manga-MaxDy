const express = require("express");
const { z } = require("zod");

const authMiddleware = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");
const rateLimit = require("../../middlewares/rateLimit.middleware");
const commentController = require("./comment.controller");
const { createCommentSchema, updateCommentSchema, reportCommentSchema } = require("./comment.schema");

const router = express.Router();
const createStandaloneCommentSchema = createCommentSchema.extend({ mangaId: z.string() });
const commentRateLimit = rateLimit({ max: 45, keyPrefix: "comments" });

router.get("/manga/:mangaId", commentController.getCommentsByManga);
router.post("/", authMiddleware, commentRateLimit, validate(createStandaloneCommentSchema), commentController.createComment);
router.post("/:commentId/replies", authMiddleware, commentRateLimit, validate(createCommentSchema), commentController.replyToComment);
router.patch("/:commentId", authMiddleware, validate(updateCommentSchema), commentController.updateComment);
router.delete("/:commentId", authMiddleware, commentController.deleteComment);
router.post("/:commentId/like", authMiddleware, commentController.toggleLike);
router.post("/:commentId/report", authMiddleware, commentRateLimit, validate(reportCommentSchema), commentController.reportComment);

module.exports = router;
