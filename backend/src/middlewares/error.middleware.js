const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === "production";

  if (statusCode >= 500) {
    console.error(err);
  }

  res.status(statusCode).json({
    ok: false,
    message: err.message || "Error interno del servidor",
    errors: err.details || undefined,
    stack: !isProduction && statusCode >= 500 ? err.stack : undefined,
  });
};

module.exports = errorMiddleware;
