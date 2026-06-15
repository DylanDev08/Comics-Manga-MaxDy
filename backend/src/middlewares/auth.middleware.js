const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ ok: false, message: "Token no enviado" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, username: true, email: true, role: true }
    });

    if (!user) {
      return res.status(401).json({ ok: false, message: "Usuario no válido" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ ok: false, message: "Token inválido" });
  }
};

module.exports = authMiddleware;