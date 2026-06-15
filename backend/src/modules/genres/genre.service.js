const prisma = require("../../config/prisma");

const getAllGenres = () => {
  return prisma.genre.findMany({
    orderBy: { name: "asc" }
  });
};

const createGenre = (data) => {
  return prisma.genre.create({ data });
};

const updateGenre = (id, data) => {
  return prisma.genre.update({
    where: { id },
    data
  });
};

const deleteGenre = (id) => {
  return prisma.genre.delete({
    where: { id }
  });
};

module.exports = {
  getAllGenres,
  createGenre,
  updateGenre,
  deleteGenre
};