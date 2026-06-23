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

const getCommentsByChapter = (chapterId) => {
  return prisma.comment.findMany({
    where: { chapterId, parentId: null, status: { not: "DELETED" } },
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

const createChapterComment = async (userId, chapterId, data) => {
  const chapter = await prisma.chapter.findUnique({
    where: { id: chapterId },
    select: { id: true, mangaId: true },
  });

  if (!chapter) {
    throw new AppError("Capitulo no encontrado", 404);
  }

  return createComment(userId, chapter.mangaId, { ...data, chapterId });
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

const getReportedComments = () => {
  return prisma.comment.findMany({
    where: {
      OR: [{ status: "REPORTED" }, { reports: { some: { resolvedAt: null } } }],
    },
    include: {
      ...commentInclude,
      reports: {
        include: { user: { select: { id: true, username: true, email: true } } },
        orderBy: { createdAt: "desc" },
      },
      manga: { select: { id: true, title: true, slug: true } },
      chapter: { select: { id: true, title: true, number: true } },
    },
    orderBy: { updatedAt: "desc" },
  });
};

const updateCommentStatus = (id, status) => {
  return prisma.comment.update({
    where: { id },
    data: { status },
    include: commentInclude,
  });
};

module.exports = {
  getCommentsByManga,
  getCommentsByChapter,
  createComment,
  createChapterComment,
  replyToComment,
  updateComment,
  deleteComment,
  toggleLike,
  reportComment,
  getReportedComments,
  updateCommentStatus,
};
