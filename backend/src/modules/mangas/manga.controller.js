const mangaService = require("./manga.service");

const getAllMangas = async (req, res, next) => {
  try {
    const mangas = await mangaService.getAllMangas();
    res.json({ ok: true, data: mangas });
  } catch (error) {
    next(error);
  }
};

const getMangaById = async (req, res, next) => {
  try {
    const manga = await mangaService.getMangaById(req.params.id);
    res.json({ ok: true, data: manga });
  } catch (error) {
    next(error);
  }
};

const createManga = async (req, res, next) => {
  try {
    const manga = await mangaService.createManga(req.body);
    res.status(201).json({ ok: true, data: manga });
  } catch (error) {
    next(error);
  }
};

const updateManga = async (req, res, next) => {
  try {
    const manga = await mangaService.updateManga(req.params.id, req.body);
    res.json({ ok: true, data: manga });
  } catch (error) {
    next(error);
  }
};

const deleteManga = async (req, res, next) => {
  try {
    await mangaService.deleteManga(req.params.id);
    res.json({ ok: true, message: "Manga eliminado" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMangas,
  getMangaById,
  createManga,
  updateManga,
  deleteManga
};