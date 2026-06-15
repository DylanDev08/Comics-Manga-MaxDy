const prisma = require("../../config/prisma");

const getAllMangas = () => {
  return prisma.manga.findMany({
    include: {
      genres: { include: { genre: true } },
      chapters: true
    },
    orderBy: { createdAt: "desc" }
  });
};

const getMangaById = (id) => {
  return prisma.manga.findUnique({
    where: { id },
    include: {
      genres: { include: { genre: true } },
      chapters: true
    }
  });
};

const createManga = (data) => {
  return prisma.manga.create({ data });
};

const updateManga = (id, data) => {
  return prisma.manga.update({
    where: { id },
    data
  });
};

const deleteManga = (id) => {
  return prisma.manga.delete({
    where: { id }
  });
};

module.exports = {
  getAllMangas,
  getMangaById,
  createManga,
  updateManga,
  deleteManga
};