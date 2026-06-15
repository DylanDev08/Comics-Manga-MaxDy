const express = require("express");

const router = express.Router();

const authMiddleware = require("../../middlewares/auth.middleware");
const commentController = require("./comment.controller");

router.get(
  "/manga/:mangaId",
  commentController.getCommentsByManga
);

router.post(
  "/",
  authMiddleware,
  commentController.createComment
);

router.delete(
  "/:id",
  authMiddleware,
  commentController.deleteComment
);

module.exports = router;