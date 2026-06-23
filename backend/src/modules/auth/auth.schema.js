const { z } = require("zod");

const password = z.string().min(8).max(128);

const registerSchema = z.object({
  username: z.string().min(3).max(32).regex(/^[a-zA-Z0-9_-]+$/),
  email: z.string().email().toLowerCase(),
  password,
});

const loginSchema = z.object({
  email: z.string().email().toLowerCase(),
  password,
});

const forgotPasswordSchema = z.object({
  email: z.string().email().toLowerCase(),
});

const resetPasswordSchema = z.object({
  token: z.string().min(24),
  password,
});

module.exports = {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
};
