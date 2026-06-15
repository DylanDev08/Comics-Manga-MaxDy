const express = require("express");
const userController = require("./user.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

const router = express.Router();

router.get("/me", authMiddleware, userController.getProfile);
router.get("/", authMiddleware, userController.getAllUsers);

module.exports = router;