const prisma = require("../../config/prisma");

const getLibrary = (userId) => {
  return prisma.libraryItem.findMany({
    where: { userId },
    include: { manga: true },
    orderBy: { updatedAt: "desc" },
  });
};

const upsertLibraryItem = (userId, data) => {
  return prisma.libraryItem.upsert({
    where: { userId_mangaId: { userId, mangaId: data.mangaId } },
    create: { userId, mangaId: data.mangaId, status: data.status },
    update: { status: data.status },
  });
};

const removeLibraryItem = async (userId, mangaId) => {
  await prisma.libraryItem.deleteMany({ where: { userId, mangaId } });
};

module.exports = {
  getLibrary,
  upsertLibraryItem,
  removeLibraryItem,
};
