const authService = require("./auth.service");

const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);

    res.status(201).json({
      ok: true,
      message: "Usuario registrado correctamente",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);

    res.json({
      ok: true,
      message: "Login exitoso",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login
};