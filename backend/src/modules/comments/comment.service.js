const prisma = require("../../config/prisma");

const getCommentsByManga = (mangaId) => {
  return prisma.comment.findMany({
    where: {
      mangaId,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const createComment = (userId, mangaId, content) => {
  return prisma.comment.create({
    data: {
      userId,
      mangaId,
      content,
    },
  });
};

const deleteComment = (id) => {
  return prisma.comment.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  getCommentsByManga,
  createComment,
  deleteComment,
};