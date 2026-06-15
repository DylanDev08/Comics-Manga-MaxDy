const userService = require("./user.service");

const getProfile = async (req, res, next) => {
  try {
    const user = await userService.getProfile(req.user.id);

    res.json({
      ok: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();

    res.json({
      ok: true,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  getAllUsers
};