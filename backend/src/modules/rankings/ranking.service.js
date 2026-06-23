const prisma = require("../../config/prisma");

const getRankings = () => {
  return prisma.manga.findMany({
    where: { isPublished: true },
    include: { genres: { include: { genre: true } } },
    orderBy: [{ ranking: "asc" }, { score: "desc" }],
    take: 25,
  });
};

module.exports = {
  getRankings,
};
