const authService = require("./auth.service");
const { getEnv } = require("../../config/env");

const cookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

const setSessionCookie = (res, token) => {
  res.cookie(getEnv().cookieName, token, cookieOptions());
};

const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body, req);
    setSessionCookie(res, result.token);

    res.status(201).json({
      ok: true,
      message: "Usuario registrado correctamente",
      data: { user: result.user },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body, req);
    setSessionCookie(res, result.token);

    res.json({
      ok: true,
      message: "Login exitoso",
      data: { user: result.user },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const env = getEnv();
    await authService.logout(req.cookies?.[env.cookieName]);
    res.clearCookie(env.cookieName, cookieOptions());
    res.json({ ok: true, message: "Sesion cerrada" });
  } catch (error) {
    next(error);
  }
};

const me = async (req, res, next) => {
  try {
    const user = await authService.getMe(req.user.id);
    res.json({ ok: true, data: user });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const result = await authService.forgotPassword(req.body.email);
    res.json({ ok: true, message: "Si el email existe, enviamos instrucciones", data: result });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    await authService.resetPassword(req.body);
    res.json({ ok: true, message: "Password actualizado" });
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const user = await authService.verifyEmail(req.user.id);
    res.json({ ok: true, message: "Email verificado", data: user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  me,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
