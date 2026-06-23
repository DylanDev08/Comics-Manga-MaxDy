const userService = require("./user.service");

const getProfile = async (req, res, next) => {
  try {
    const user = await userService.getProfile(req.user.id);
    res.json({ ok: true, data: user });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const user = await userService.updateProfile(req.user.id, req.body);
    res.json({ ok: true, data: user });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json({ ok: true, data: users });
  } catch (error) {
    next(error);
  }
};

const getLibrary = async (req, res, next) => {
  try {
    const library = await userService.getLibrary(req.user.id);
    res.json({ ok: true, data: library });
  } catch (error) {
    next(error);
  }
};

const getFavorites = async (req, res, next) => {
  try {
    const favorites = await userService.getFavorites(req.user.id);
    res.json({ ok: true, data: favorites });
  } catch (error) {
    next(error);
  }
};

const getHistory = async (req, res, next) => {
  try {
    const history = await userService.getHistory(req.user.id);
    res.json({ ok: true, data: history });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getAllUsers,
  getLibrary,
  getFavorites,
  getHistory,
};
