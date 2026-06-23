const prisma = require("../../config/prisma");
const AppError = require("../../utils/appError");

const commentInclude = {
  user: { select: { id: true, username: true, avatarUrl: true, role: true } },
  replies: {
    include: {
      user: { select: { id: true, username: true, avatarUrl: true, role: true } },
      _count: { select: { likes: true, reports: true } },
    },
    orderBy: { createdAt: "asc" },
  },
  _count: { select: { likes: true, reports: true } },
};

const getCommentsByManga = (mangaId) => {
  return prisma.comment.findMany({
    where: { mangaId, parentId: null, status: { not: "DELETED" } },
    include: commentInclude,
    orderBy: { createdAt: "desc" },
  });
};

const createComment = (userId, mangaId, data) => {
  return prisma.comment.create({
    data: {
      userId,
      mangaId,
      content: data.content,
      chapterId: data.chapterId,
      threadId: data.threadId,
    },
    include: commentInclude,
  });
};

const replyToComment = async (userId, commentId, content) => {
  const parent = await prisma.comment.findUnique({ where: { id: commentId } });

  if (!parent) {
    throw new AppError("Comentario no encontrado", 404);
  }

  return prisma.comment.create({
    data: {
      userId,
      mangaId: parent.mangaId,
      chapterId: parent.chapterId,
      threadId: parent.threadId,
      parentId: parent.id,
      content,
    },
    include: commentInclude,
  });
};

const updateComment = async (user, id, content) => {
  const comment = await prisma.comment.findUnique({ where: { id } });

  if (!comment) {
    throw new AppError("Comentario no encontrado", 404);
  }

  if (comment.userId !== user.id && !["ADMIN", "MODERATOR"].includes(user.role)) {
    throw new AppError("No podes editar este comentario", 403);
  }

  return prisma.comment.update({
    where: { id },
    data: { content },
    include: commentInclude,
  });
};

const deleteComment = async (user, id) => {
  const comment = await prisma.comment.findUnique({ where: { id } });

  if (!comment) {
    throw new AppError("Comentario no encontrado", 404);
  }

  if (comment.userId !== user.id && !["ADMIN", "MODERATOR"].includes(user.role)) {
    throw new AppError("No podes eliminar este comentario", 403);
  }

  return prisma.comment.update({
    where: { id },
    data: { status: "DELETED", content: "Comentario eliminado" },
  });
};

const toggleLike = async (userId, commentId) => {
  const existing = await prisma.commentLike.findUnique({
    where: { userId_commentId: { userId, commentId } },
  });

  if (existing) {
    await prisma.commentLike.delete({ where: { id: existing.id } });
    return { liked: false };
  }

  await prisma.commentLike.create({
    data: { userId, commentId, type: "LIKE" },
  });

  return { liked: true };
};

const reportComment = (userId, commentId, data) => {
  return prisma.commentReport.create({
    data: {
      userId,
      commentId,
      reason: data.reason,
      details: data.details,
    },
  });
};

module.exports = {
  getCommentsByManga,
  createComment,
  replyToComment,
  updateComment,
  deleteComment,
  toggleLike,
  reportComment,
};
