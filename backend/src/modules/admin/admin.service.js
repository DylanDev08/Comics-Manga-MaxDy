const prisma = require("../../config/prisma");
const mangaService = require("../mangas/manga.service");
const chapterService = require("../chapters/chapter.service");
const commentService = require("../comments/comment.service");

const getDashboard = async () => {
  const [users, mangas, chapters, comments, reports, favorites] = await Promise.all([
    prisma.user.count(),
    prisma.manga.count(),
    prisma.chapter.count(),
    prisma.comment.count(),
    prisma.commentReport.count({ where: { resolvedAt: null } }),
    prisma.favorite.count(),
  ]);

  return { users, mangas, chapters, comments, reports, favorites };
};

const listMangas = () => {
  return prisma.manga.findMany({
    include: { genres: { include: { genre: true } }, _count: { select: { chapters: true, comments: true } } },
    orderBy: { updatedAt: "desc" },
  });
};

const listChapters = () => {
  return prisma.chapter.findMany({
    include: { manga: { select: { id: true, title: true, slug: true } }, pages: { orderBy: { pageNumber: "asc" } } },
    orderBy: [{ mangaId: "asc" }, { number: "asc" }],
  });
};

module.exports = {
  getDashboard,
  listMangas,
  createManga: mangaService.createManga,
  updateManga: mangaService.updateManga,
  deleteManga: mangaService.deleteManga,
  listChapters,
  createChapter: chapterService.createChapter,
  updateChapter: chapterService.updateChapter,
  deleteChapter: chapterService.deleteChapter,
  getReportedComments: commentService.getReportedComments,
  updateCommentStatus: commentService.updateCommentStatus,
};
