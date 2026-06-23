const prisma = require("../../config/prisma");

const upsertRating = async (userId, mangaId, score) => {
  const rating = await prisma.rating.upsert({
    where: { userId_mangaId: { userId, mangaId } },
    create: { userId, mangaId, score },
    update: { score },
  });

  const aggregate = await prisma.rating.aggregate({
    where: { mangaId },
    _avg: { score: true },
  });

  await prisma.manga.update({
    where: { id: mangaId },
    data: { score: Number((aggregate._avg.score || 0).toFixed(1)) },
  });

  return rating;
};

module.exports = {
  upsertRating,
};
