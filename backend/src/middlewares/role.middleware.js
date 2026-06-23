const AppError = require("../utils/appError");

const requireRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(new AppError("No tenes permisos para esta accion", 403));
  }

  return next();
};

module.exports = requireRole;
