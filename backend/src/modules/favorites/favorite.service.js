const prisma = require("../../config/prisma");

const getUserFavorites = (userId) => {
  return prisma.favorite.findMany({
    where: { userId },
    include: { manga: { include: { genres: { include: { genre: true } } } } },
    orderBy: { createdAt: "desc" },
  });
};

const addFavorite = (userId, mangaId) => {
  return prisma.favorite.upsert({
    where: { userId_mangaId: { userId, mangaId } },
    create: { userId, mangaId },
    update: {},
  });
};

const removeFavorite = async (userId, mangaId) => {
  await prisma.favorite.deleteMany({
    where: { userId, mangaId },
  });
};

module.exports = {
  getUserFavorites,
  addFavorite,
  removeFavorite,
};
