const prisma = require("../../config/prisma");

const getChaptersByManga = (mangaId) => {
  return prisma.chapter.findMany({
    where: { mangaId },
    orderBy: { number: "asc" }
  });
};

const createChapter = (data) => {
  return prisma.chapter.create({ data });
};

const updateChapter = (id, data) => {
  return prisma.chapter.update({
    where: { id },
    data
  });
};

const deleteChapter = (id) => {
  return prisma.chapter.delete({
    where: { id }
  });
};

module.exports = {
  getChaptersByManga,
  createChapter,
  updateChapter,
  deleteChapter
};