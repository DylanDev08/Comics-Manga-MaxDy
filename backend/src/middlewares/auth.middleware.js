const prisma = require("../config/prisma");
const AppError = require("../utils/appError");
const { verifyToken } = require("../utils/jwt");
const { getEnv } = require("../config/env");

const authMiddleware = async (req, res, next) => {
  try {
    const env = getEnv();
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    const token = req.cookies?.[env.cookieName] || bearerToken;

    if (!token) {
      throw new AppError("Sesion requerida", 401);
    }

    const decoded = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, username: true, email: true, avatarUrl: true, role: true, status: true },
    });

    if (!user || user.status !== "ACTIVE") {
      throw new AppError("Usuario no valido", 401);
    }

    req.user = user;
    next();
  } catch (error) {
    next(error.statusCode ? error : new AppError("Token invalido", 401));
  }
};

module.exports = authMiddleware;
