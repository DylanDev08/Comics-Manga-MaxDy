const prisma = require("../../config/prisma");
const AppError = require("../../utils/appError");

const upsertProgress = async (userId, mangaId, data) => {
  const chapter = await prisma.chapter.findUnique({ where: { id: data.chapterId } });

  if (!chapter || chapter.mangaId !== mangaId) {
    throw new AppError("Capitulo no valido para este manga", 400);
  }

  const progress = await prisma.readingProgress.upsert({
    where: { userId_mangaId: { userId, mangaId } },
    create: {
      userId,
      mangaId,
      chapterId: data.chapterId,
      pageNumber: data.pageNumber,
    },
    update: {
      chapterId: data.chapterId,
      pageNumber: data.pageNumber,
    },
  });

  await prisma.readingHistory.upsert({
    where: { userId_chapterId: { userId, chapterId: data.chapterId } },
    create: {
      userId,
      mangaId,
      chapterId: data.chapterId,
      pageNumber: data.pageNumber,
    },
    update: {
      pageNumber: data.pageNumber,
      readAt: new Date(),
    },
  });

  return progress;
};

module.exports = {
  upsertProgress,
};
