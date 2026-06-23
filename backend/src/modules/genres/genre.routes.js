const express = require("express");

const genreController = require("./genre.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const requireRole = require("../../middlewares/role.middleware");
const validate = require("../../middlewares/validate.middleware");
const { genreSchema } = require("./genre.schema");

const router = express.Router();

router.get("/", genreController.getAllGenres);
router.post("/", authMiddleware, requireRole("ADMIN", "MODERATOR"), validate(genreSchema), genreController.createGenre);
router.put("/:id", authMiddleware, requireRole("ADMIN", "MODERATOR"), validate(genreSchema.partial()), genreController.updateGenre);
router.delete("/:id", authMiddleware, requireRole("ADMIN"), genreController.deleteGenre);

module.exports = router;
