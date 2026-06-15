const genreService = require("./genre.service");

const getAllGenres = async (req, res, next) => {
  try {
    const genres = await genreService.getAllGenres();
    res.json({ ok: true, data: genres });
  } catch (error) {
    next(error);
  }
};

const createGenre = async (req, res, next) => {
  try {
    const genre = await genreService.createGenre(req.body);
    res.status(201).json({ ok: true, data: genre });
  } catch (error) {
    next(error);
  }
};

const updateGenre = async (req, res, next) => {
  try {
    const genre = await genreService.updateGenre(req.params.id, req.body);
    res.json({ ok: true, data: genre });
  } catch (error) {
    next(error);
  }
};

const deleteGenre = async (req, res, next) => {
  try {
    await genreService.deleteGenre(req.params.id);
    res.json({ ok: true, message: "Género eliminado" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllGenres,
  createGenre,
  updateGenre,
  deleteGenre
};