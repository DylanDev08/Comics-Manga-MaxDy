const express = require("express");

const authController = require("./auth.controller");
const validate = require("../../middlewares/validate.middleware");
const authMiddleware = require("../../middlewares/auth.middleware");
const rateLimit = require("../../middlewares/rateLimit.middleware");
const {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} = require("./auth.schema");

const router = express.Router();
const authRateLimit = rateLimit({ max: 20, keyPrefix: "auth" });

router.post("/register", authRateLimit, validate(registerSchema), authController.register);
router.post("/login", authRateLimit, validate(loginSchema), authController.login);
router.post("/logout", authMiddleware, authController.logout);
router.get("/me", authMiddleware, authController.me);
router.post("/forgot-password", authRateLimit, validate(forgotPasswordSchema), authController.forgotPassword);
router.post("/reset-password", authRateLimit, validate(resetPasswordSchema), authController.resetPassword);
router.post("/verify-email", authMiddleware, authController.verifyEmail);

module.exports = router;
