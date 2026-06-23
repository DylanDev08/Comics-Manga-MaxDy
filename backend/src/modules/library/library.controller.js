const libraryService = require("./library.service");

const getLibrary = async (req, res, next) => {
  try {
    const library = await libraryService.getLibrary(req.user.id);
    res.json({ ok: true, data: library });
  } catch (error) {
    next(error);
  }
};

const upsertLibraryItem = async (req, res, next) => {
  try {
    const item = await libraryService.upsertLibraryItem(req.user.id, {
      mangaId: req.params.mangaId || req.body.mangaId,
      status: req.body.status,
    });
    res.status(201).json({ ok: true, data: item });
  } catch (error) {
    next(error);
  }
};

const removeLibraryItem = async (req, res, next) => {
  try {
    await libraryService.removeLibraryItem(req.user.id, req.params.mangaId);
    res.json({ ok: true, message: "Manga eliminado de biblioteca" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLibrary,
  upsertLibraryItem,
  removeLibraryItem,
};
