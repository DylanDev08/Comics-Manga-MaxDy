const prisma = require("../../config/prisma");

const userSelect = {
  id: true,
  username: true,
  email: true,
  avatarUrl: true,
  role: true,
  status: true,
  emailVerifiedAt: true,
  createdAt: true,
  updatedAt: true,
};

const getProfile = (userId) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: userSelect,
  });
};

const updateProfile = (userId, data) => {
  return prisma.user.update({
    where: { id: userId },
    data,
    select: userSelect,
  });
};

const getAllUsers = () => {
  return prisma.user.findMany({
    select: userSelect,
    orderBy: { createdAt: "desc" },
  });
};

const getLibrary = (userId) => {
  return prisma.libraryItem.findMany({
    where: { userId },
    include: { manga: { include: { genres: { include: { genre: true } } } } },
    orderBy: { updatedAt: "desc" },
  });
};

const getFavorites = (userId) => {
  return prisma.favorite.findMany({
    where: { userId },
    include: { manga: true },
    orderBy: { createdAt: "desc" },
  });
};

const getHistory = (userId) => {
  return prisma.readingHistory.findMany({
    where: { userId },
    include: {
      manga: { select: { id: true, title: true, slug: true, coverUrl: true } },
      chapter: { select: { id: true, title: true, number: true } },
    },
    orderBy: { readAt: "desc" },
    take: 50,
  });
};

module.exports = {
  getProfile,
  updateProfile,
  getAllUsers,
  getLibrary,
  getFavorites,
  getHistory,
};
