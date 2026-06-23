const favoriteService = require("./favorite.service");

const getUserFavorites = async (req, res, next) => {
  try {
    const favorites = await favoriteService.getUserFavorites(req.user.id);
    res.json({ ok: true, data: favorites });
  } catch (error) {
    next(error);
  }
};

const addFavorite = async (req, res, next) => {
  try {
    const favorite = await favoriteService.addFavorite(req.user.id, req.params.mangaId || req.body.mangaId);
    res.status(201).json({ ok: true, data: favorite });
  } catch (error) {
    next(error);
  }
};

const removeFavorite = async (req, res, next) => {
  try {
    await favoriteService.removeFavorite(req.user.id, req.params.mangaId);
    res.json({ ok: true, message: "Manga eliminado de favoritos" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserFavorites,
  addFavorite,
  removeFavorite,
};
