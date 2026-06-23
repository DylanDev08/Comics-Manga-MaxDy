const prisma = require("../../config/prisma");
const AppError = require("../../utils/appError");
const createSlug = require("../../utils/slug");

const mangaInclude = {
  genres: { include: { genre: true } },
  chapters: {
    where: { isPublished: true },
    orderBy: { number: "asc" },
    select: { id: true, title: true, number: true, slug: true, publicationDate: true },
  },
  _count: { select: { favorites: true, comments: true, libraryItems: true } },
};

const mapManga = (manga) => ({
  ...manga,
  genres: manga.genres?.map((item) => item.genre) || [],
});

const getAllMangas = async (query) => {
  const page = query.page || 1;
  const limit = query.limit || 12;
  const skip = (page - 1) * limit;
  const orderBy = {
    ranking: { ranking: "asc" },
    popularidad: { popularity: "desc" },
    popularity: { popularity: "desc" },
    score: { score: "desc" },
    createdAt: { createdAt: "desc" },
  }[query.sort || "createdAt"];

  const where = {
    isPublished: true,
    ...(query.status ? { status: query.status } : {}),
    ...(query.search
      ? {
          OR: [
            { title: { contains: query.search, mode: "insensitive" } },
            { alternativeTitle: { contains: query.search, mode: "insensitive" } },
            { description: { contains: query.search, mode: "insensitive" } },
          ],
        }
      : {}),
    ...(query.genre
      ? {
          genres: {
            some: {
              genre: { slug: query.genre },
            },
          },
        }
      : {}),
  };

  const [items, total] = await Promise.all([
    prisma.manga.findMany({ where, include: mangaInclude, orderBy, skip, take: limit }),
    prisma.manga.count({ where }),
  ]);

  return {
    items: items.map(mapManga),
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

const getMangaBySlug = async (slug) => {
  const manga = await prisma.manga.findUnique({
    where: { slug },
    include: mangaInclude,
  });

  if (!manga || !manga.isPublished) {
    throw new AppError("Manga no encontrado", 404);
  }

  return mapManga(manga);
};

const createManga = async (data) => {
  const { genreIds = [], ...mangaData } = data;
  const slug = createSlug(mangaData.title);

  return prisma.manga.create({
    data: {
      ...mangaData,
      slug,
      genres: { create: genreIds.map((genreId) => ({ genreId })) },
    },
    include: mangaInclude,
  });
};

const updateManga = async (id, data) => {
  const { genreIds, ...mangaData } = data;

  return prisma.manga.update({
    where: { id },
    data: {
      ...mangaData,
      ...(mangaData.title ? { slug: createSlug(mangaData.title) } : {}),
      ...(genreIds
        ? {
            genres: {
              deleteMany: {},
              create: genreIds.map((genreId) => ({ genreId })),
            },
          }
        : {}),
    },
    include: mangaInclude,
  });
};

const deleteManga = (id) => {
  return prisma.manga.delete({ where: { id } });
};

const getChaptersByMangaSlug = async (slug) => {
  const manga = await prisma.manga.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (!manga) {
    throw new AppError("Manga no encontrado", 404);
  }

  return prisma.chapter.findMany({
    where: { mangaId: manga.id, isPublished: true },
    orderBy: { number: "asc" },
  });
};

module.exports = {
  getAllMangas,
  getMangaBySlug,
  createManga,
  updateManga,
  deleteManga,
  getChaptersByMangaSlug,
};
