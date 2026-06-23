const express = require("express");

const authRoutes = require("../modules/auth/auth.routes");
const userRoutes = require("../modules/users/user.routes");
const mangaRoutes = require("../modules/mangas/manga.routes");
const genreRoutes = require("../modules/genres/genre.routes");
const chapterRoutes = require("../modules/chapters/chapter.routes");
const favoriteRoutes = require("../modules/favorites/favorite.routes");
const commentRoutes = require("../modules/comments/comment.routes");
const libraryRoutes = require("../modules/library/library.routes");
const progressRoutes = require("../modules/progress/progress.routes");
const rankingRoutes = require("../modules/rankings/ranking.routes");
const adminRoutes = require("../modules/admin/admin.routes");
const ratingRoutes = require("../modules/ratings/rating.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/mangas", mangaRoutes);
router.use("/genres", genreRoutes);
router.use("/chapters", chapterRoutes);
router.use("/favorites", favoriteRoutes);
router.use("/comments", commentRoutes);
router.use("/library", libraryRoutes);
router.use("/progress", progressRoutes);
router.use("/rankings", rankingRoutes);
router.use("/ratings", ratingRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
