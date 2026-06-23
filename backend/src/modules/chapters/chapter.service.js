const prisma = require("../../config/prisma");
const AppError = require("../../utils/appError");
const createSlug = require("../../utils/slug");

const getChapterById = async (id) => {
  const chapter = await prisma.chapter.findUnique({
    where: { id },
    include: {
      manga: { select: { id: true, title: true, slug: true } },
      pages: { orderBy: { pageNumber: "asc" } },
    },
  });

  if (!chapter || !chapter.isPublished) {
    throw new AppError("Capitulo no encontrado", 404);
  }

  return chapter;
};

const getChaptersByManga = (mangaId) => {
  return prisma.chapter.findMany({
    where: { mangaId, isPublished: true },
    orderBy: { number: "asc" },
  });
};

const createChapter = (data) => {
  const { pages = [], ...chapterData } = data;

  return prisma.chapter.create({
    data: {
      ...chapterData,
      slug: createSlug(`${chapterData.number}-${chapterData.title}`),
      pages: { create: pages },
    },
    include: { pages: { orderBy: { pageNumber: "asc" } } },
  });
};

const updateChapter = (id, data) => {
  const { pages, ...chapterData } = data;

  return prisma.chapter.update({
    where: { id },
    data: {
      ...chapterData,
      ...(chapterData.title || chapterData.number
        ? { slug: createSlug(`${chapterData.number || ""}-${chapterData.title || ""}`) }
        : {}),
      ...(pages
        ? {
            pages: {
              deleteMany: {},
              create: pages,
            },
          }
        : {}),
    },
    include: { pages: { orderBy: { pageNumber: "asc" } } },
  });
};

const deleteChapter = (id) => {
  return prisma.chapter.delete({ where: { id } });
};

module.exports = {
  getChapterById,
  getChaptersByManga,
  createChapter,
  updateChapter,
  deleteChapter,
};
