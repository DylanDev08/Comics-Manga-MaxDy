const chapterService = require("./chapter.service");

const getChaptersByManga = async (req, res, next) => {
  try {
    const chapters = await chapterService.getChaptersByManga(req.params.mangaId);
    res.json({ ok: true, data: chapters });
  } catch (error) {
    next(error);
  }
};

const createChapter = async (req, res, next) => {
  try {
    const chapter = await chapterService.createChapter(req.body);
    res.status(201).json({ ok: true, data: chapter });
  } catch (error) {
    next(error);
  }
};

const updateChapter = async (req, res, next) => {
  try {
    const chapter = await chapterService.updateChapter(req.params.id, req.body);
    res.json({ ok: true, data: chapter });
  } catch (error) {
    next(error);
  }
};

const deleteChapter = async (req, res, next) => {
  try {
    await chapterService.deleteChapter(req.params.id);
    res.json({ ok: true, message: "Capítulo eliminado" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getChaptersByManga,
  createChapter,
  updateChapter,
  deleteChapter
};