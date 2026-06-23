const commentService = require("./comment.service");

const getCommentsByManga = async (req, res, next) => {
  try {
    const comments = await commentService.getCommentsByManga(req.params.mangaId);
    res.json({ ok: true, data: comments });
  } catch (error) {
    next(error);
  }
};

const getCommentsByChapter = async (req, res, next) => {
  try {
    const comments = await commentService.getCommentsByChapter(req.params.chapterId);
    res.json({ ok: true, data: comments });
  } catch (error) {
    next(error);
  }
};

const createComment = async (req, res, next) => {
  try {
    const comment = await commentService.createComment(req.user.id, req.params.mangaId || req.body.mangaId, req.body);
    res.status(201).json({ ok: true, data: comment });
  } catch (error) {
    next(error);
  }
};

const createChapterComment = async (req, res, next) => {
  try {
    const comment = await commentService.createChapterComment(req.user.id, req.params.chapterId, req.body);
    res.status(201).json({ ok: true, data: comment });
  } catch (error) {
    next(error);
  }
};

const replyToComment = async (req, res, next) => {
  try {
    const comment = await commentService.replyToComment(req.user.id, req.params.commentId, req.body.content);
    res.status(201).json({ ok: true, data: comment });
  } catch (error) {
    next(error);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const comment = await commentService.updateComment(req.user, req.params.commentId, req.body.content);
    res.json({ ok: true, data: comment });
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    await commentService.deleteComment(req.user, req.params.commentId);
    res.json({ ok: true, message: "Comentario eliminado" });
  } catch (error) {
    next(error);
  }
};

const toggleLike = async (req, res, next) => {
  try {
    const result = await commentService.toggleLike(req.user.id, req.params.commentId);
    res.json({ ok: true, data: result });
  } catch (error) {
    next(error);
  }
};

const reportComment = async (req, res, next) => {
  try {
    const report = await commentService.reportComment(req.user.id, req.params.commentId, req.body);
    res.status(201).json({ ok: true, data: report });
  } catch (error) {
    next(error);
  }
};

const getReportedComments = async (req, res, next) => {
  try {
    const comments = await commentService.getReportedComments();
    res.json({ ok: true, data: comments });
  } catch (error) {
    next(error);
  }
};

const updateCommentStatus = async (req, res, next) => {
  try {
    const comment = await commentService.updateCommentStatus(req.params.id || req.params.commentId, req.body.status);
    res.json({ ok: true, data: comment });
  } catch (error) {
    next(error);
  }
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
