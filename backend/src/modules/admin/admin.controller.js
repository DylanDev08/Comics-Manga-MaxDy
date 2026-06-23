const adminService = require("./admin.service");

const getDashboard = async (req, res, next) => {
  try {
    res.json({ ok: true, data: await adminService.getDashboard() });
  } catch (error) {
    next(error);
  }
};

const listMangas = async (req, res, next) => {
  try {
    res.json({ ok: true, data: await adminService.listMangas() });
  } catch (error) {
    next(error);
  }
};

const createManga = async (req, res, next) => {
  try {
    res.status(201).json({ ok: true, data: await adminService.createManga(req.body) });
  } catch (error) {
    next(error);
  }
};

const updateManga = async (req, res, next) => {
  try {
    res.json({ ok: true, data: await adminService.updateManga(req.params.id, req.body) });
  } catch (error) {
    next(error);
  }
};

const deleteManga = async (req, res, next) => {
  try {
    await adminService.deleteManga(req.params.id);
    res.json({ ok: true, message: "Manga eliminado" });
  } catch (error) {
    next(error);
  }
};

const listChapters = async (req, res, next) => {
  try {
    res.json({ ok: true, data: await adminService.listChapters() });
  } catch (error) {
    next(error);
  }
};

const createChapter = async (req, res, next) => {
  try {
    res.status(201).json({ ok: true, data: await adminService.createChapter(req.body) });
  } catch (error) {
    next(error);
  }
};

const updateChapter = async (req, res, next) => {
  try {
    res.json({ ok: true, data: await adminService.updateChapter(req.params.id, req.body) });
  } catch (error) {
    next(error);
  }
};

const deleteChapter = async (req, res, next) => {
  try {
    await adminService.deleteChapter(req.params.id);
    res.json({ ok: true, message: "Capitulo eliminado" });
  } catch (error) {
    next(error);
  }
};

const getReportedComments = async (req, res, next) => {
  try {
    res.json({ ok: true, data: await adminService.getReportedComments() });
  } catch (error) {
    next(error);
  }
};

const updateCommentStatus = async (req, res, next) => {
  try {
    res.json({ ok: true, data: await adminService.updateCommentStatus(req.params.id, req.body.status) });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboard,
  listMangas,
  createManga,
  updateManga,
  deleteManga,
  listChapters,
  createChapter,
  updateChapter,
  deleteChapter,
  getReportedComments,
  updateCommentStatus,
};
