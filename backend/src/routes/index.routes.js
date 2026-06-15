const express = require("express");

const router = express.Router();

const authRoutes = require("../modules/auth/auth.routes");
const userRoutes = require("../modules/users/user.routes");
const mangaRoutes = require("../modules/mangas/manga.routes");
const genreRoutes = require("../modules/genres/genre.routes");
const chapterRoutes = require("../modules/chapters/chapter.routes");
const favoriteRoutes = require("../modules/favorites/favorite.routes");
const commentRoutes = require("../modules/comments/comment.routes");
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/mangas", mangaRoutes);
router.use("/genres", genreRoutes);
router.use("/chapters", chapterRoutes);
router.use("/favorites", favoriteRoutes);
router.use("/comments", commentRoutes);
module.exports = router;