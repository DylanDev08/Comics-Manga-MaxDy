const prisma = require("../../config/prisma");
const createSlug = require("../../utils/slug");

const getAllGenres = () => {
  return prisma.genre.findMany({
    orderBy: { name: "asc" },
  });
};

const createGenre = (data) => {
  return prisma.genre.create({
    data: {
      name: data.name,
      slug: data.slug || createSlug(data.name),
    },
  });
};

const updateGenre = (id, data) => {
  return prisma.genre.update({
    where: { id },
    data: {
      ...data,
      ...(data.name && !data.slug ? { slug: createSlug(data.name) } : {}),
    },
  });
};

const deleteGenre = (id) => {
  return prisma.genre.delete({ where: { id } });
};

module.exports = {
  getAllGenres,
  createGenre,
  updateGenre,
  deleteGenre,
};
