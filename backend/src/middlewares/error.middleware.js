const errorMiddleware = (err, req, res, next) => {
    console.error(err);

    res.status(err.statusCode || 500).json({
        ok: false,
        message: err.message || "Error interno del servidor"
    });
};

module.exports = errorMiddleware;