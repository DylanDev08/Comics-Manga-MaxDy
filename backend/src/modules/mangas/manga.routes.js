const express = require("express");

const mangaController = require("./manga.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const requireRole = require("../../middlewares/role.middleware");
const validate = require("../../middlewares/validate.middleware");
const { listMangasSchema, mangaSchema } = require("./manga.schema");
const commentController = require("../comments/comment.controller");
const { createCommentSchema } = require("../comments/comment.schema");

const router = express.Router();

router.get("/", validate(listMangasSchema, "query"), mangaController.getAllMangas);
router.get("/:slug", mangaController.getMangaBySlug);
router.get("/:slug/chapters", mangaController.getChaptersByManga);
router.get("/:mangaId/comments", commentController.getCommentsByManga);
router.post("/:mangaId/comments", authMiddleware, validate(createCommentSchema), commentController.createComment);
router.post("/", authMiddleware, requireRole("ADMIN", "MODERATOR"), validate(mangaSchema), mangaController.createManga);
router.put("/:id", authMiddleware, requireRole("ADMIN", "MODERATOR"), validate(mangaSchema.partial()), mangaController.updateManga);
router.delete("/:id", authMiddleware, requireRole("ADMIN"), mangaController.deleteManga);

module.exports = router;
