const validate = (schema, source = "body") => {
  return (req, res, next) => {
    try {
      req[source] = schema.parse(req[source]);
      next();
    } catch (error) {
      return res.status(400).json({
        ok: false,
        message: "Error de validacion",
        errors: error.errors || error.issues,
      });
    }
  };
};

module.exports = validate;
