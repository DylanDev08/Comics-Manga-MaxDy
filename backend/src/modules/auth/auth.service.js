const crypto = require("crypto");

const prisma = require("../../config/prisma");
const { hashPassword, comparePassword } = require("../../utils/hash");
const { generateToken } = require("../../utils/jwt");
const AppError = require("../../utils/appError");

const userSelect = {
  id: true,
  username: true,
  email: true,
  avatarUrl: true,
  role: true,
  status: true,
  emailVerifiedAt: true,
  createdAt: true,
};

const createSessionToken = async (user, req) => {
  const token = generateToken({ id: user.id, role: user.role });
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await prisma.session.create({
    data: {
      userId: user.id,
      tokenHash,
      userAgent: req.headers["user-agent"],
      ipAddress: req.ip,
      expiresAt,
    },
  });

  return token;
};

const register = async ({ username, email, password }, req) => {
  const userExists = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
  });

  if (userExists) {
    throw new AppError("El usuario o email ya existe", 409);
  }

  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({
    data: { username, email, passwordHash },
    select: userSelect,
  });

  const token = await createSessionToken(user, req);
  return { user, token };
};

const login = async ({ email, password }, req) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.status !== "ACTIVE") {
    throw new AppError("Credenciales invalidas", 401);
  }

  const isPasswordValid = await comparePassword(password, user.passwordHash);

  if (!isPasswordValid) {
    throw new AppError("Credenciales invalidas", 401);
  }

  const token = await createSessionToken(user, req);

  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      avatarUrl: user.avatarUrl,
      role: user.role,
      status: user.status,
      emailVerifiedAt: user.emailVerifiedAt,
    },
    token,
  };
};

const logout = async (token) => {
  if (!token) return;

  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

  await prisma.session.updateMany({
    where: { tokenHash, revokedAt: null },
    data: { revokedAt: new Date() },
  });
};

const getMe = (userId) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: userSelect,
  });
};

const forgotPassword = async (email) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return { sent: true };
  }

  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordResetToken: tokenHash,
      passwordResetExpiresAt: new Date(Date.now() + 60 * 60 * 1000),
    },
  });

  return { sent: true, resetToken: process.env.NODE_ENV === "production" ? undefined : rawToken };
};

const resetPassword = async ({ token, password }) => {
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

  const user = await prisma.user.findFirst({
    where: {
      passwordResetToken: tokenHash,
      passwordResetExpiresAt: { gt: new Date() },
    },
  });

  if (!user) {
    throw new AppError("Token invalido o expirado", 400);
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash: await hashPassword(password),
      passwordResetToken: null,
      passwordResetExpiresAt: null,
    },
  });

  await prisma.session.updateMany({
    where: { userId: user.id, revokedAt: null },
    data: { revokedAt: new Date() },
  });

  return { updated: true };
};

const verifyEmail = (userId) => {
  return prisma.user.update({
    where: { id: userId },
    data: { emailVerifiedAt: new Date() },
    select: userSelect,
  });
};

module.exports = {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
