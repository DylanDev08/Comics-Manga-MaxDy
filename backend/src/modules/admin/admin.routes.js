const express = require("express");

const authMiddleware = require("../../middlewares/auth.middleware");
const requireRole = require("../../middlewares/role.middleware");
const validate = require("../../middlewares/validate.middleware");
const { mangaSchema } = require("../mangas/manga.schema");
const { chapterSchema } = require("../chapters/chapter.schema");
const { commentStatusSchema } = require("./admin.schema");
const adminController = require("./admin.controller");

const router = express.Router();

router.use(authMiddleware, requireRole("ADMIN"));

router.get("/dashboard", adminController.getDashboard);
router.get("/mangas", adminController.listMangas);
router.post("/mangas", validate(mangaSchema), adminController.createManga);
router.patch("/mangas/:id", validate(mangaSchema.partial()), adminController.updateManga);
router.delete("/mangas/:id", adminController.deleteManga);
router.get("/chapters", adminController.listChapters);
router.post("/chapters", validate(chapterSchema), adminController.createChapter);
router.patch("/chapters/:id", validate(chapterSchema.partial()), adminController.updateChapter);
router.delete("/chapters/:id", adminController.deleteChapter);
router.get("/comments/reported", adminController.getReportedComments);
router.patch("/comments/:id/status", validate(commentStatusSchema), adminController.updateCommentStatus);

module.exports = router;
