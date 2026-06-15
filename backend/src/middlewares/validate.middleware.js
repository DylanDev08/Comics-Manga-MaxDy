const validate = (schema) => {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      return res.status(400).json({
        ok: false,
        message: "Error de validación",
        errors: error.errors || error.issues,
      });
    }
  };
};

module.exports = validate;