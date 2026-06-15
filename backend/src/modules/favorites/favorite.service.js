const prisma = require("../../config/prisma");

const getUserFavorites = (userId) => {
  return prisma.favorite.findMany({
    where: { userId },
    include: { manga: true },
    orderBy: { createdAt: "desc" }
  });
};

const addFavorite = (userId, mangaId) => {
  return prisma.favorite.create({
    data: { userId, mangaId }
  });
};

const removeFavorite = (userId, mangaId) => {
  return prisma.favorite.delete({
    where: {
      userId_mangaId: { userId, mangaId }
    }
  });
};

module.exports = {
  getUserFavorites,
  addFavorite,
  removeFavorite
};