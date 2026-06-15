const prisma = require("../../config/prisma");
const { hashPassword, comparePassword } = require("../../utils/hash");
const { generateToken } = require("../../utils/jwt");

const register = async ({ username, email, password }) => {
  const userExists = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }]
    }
  });

  if (userExists) {
    throw new Error("El usuario o email ya existe");
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword
    },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      createdAt: true
    }
  });

  const token = generateToken({
    id: user.id,
    role: user.role
  });

  return { user, token };
};

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error("Credenciales inválidas");
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Credenciales inválidas");
  }

  const token = generateToken({
    id: user.id,
    role: user.role
  });

  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    },
    token
  };
};

module.exports = {
  register,
  login
};