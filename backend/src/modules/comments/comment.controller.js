const commentService = require("./comment.service");

const getCommentsByManga = async (req, res, next) => {
  try {
    const comments = await commentService.getCommentsByManga(
      req.params.mangaId
    );

    res.json({
      ok: true,
      data: comments,
    });
  } catch (error) {
    next(error);
  }
};

const createComment = async (req, res, next) => {
  try {
    const comment = await commentService.createComment(
      req.user.id,
      req.body.mangaId,
      req.body.content
    );

    res.status(201).json({
      ok: true,
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    await commentService.deleteComment(req.params.id);

    res.json({
      ok: true,
      message: "Comentario eliminado",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCommentsByManga,
  createComment,
  deleteComment,
};