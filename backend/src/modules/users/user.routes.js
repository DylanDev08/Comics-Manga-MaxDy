const express = require("express");

const userController = require("./user.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const requireRole = require("../../middlewares/role.middleware");
const validate = require("../../middlewares/validate.middleware");
const { updateProfileSchema } = require("./user.schema");

const router = express.Router();

router.get("/me", authMiddleware, userController.getProfile);
router.patch("/me", authMiddleware, validate(updateProfileSchema), userController.updateProfile);
router.get("/me/library", authMiddleware, userController.getLibrary);
router.get("/me/favorites", authMiddleware, userController.getFavorites);
router.get("/me/history", authMiddleware, userController.getHistory);
router.get("/", authMiddleware, requireRole("ADMIN", "MODERATOR"), userController.getAllUsers);

module.exports = router;
