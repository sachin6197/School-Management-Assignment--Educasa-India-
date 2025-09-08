const { validationResult } = require("express-validator");

function handleValidationErrors(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) return next();

  return res.status(400).json({
    success: false,
    message: "Validation failed",
    errors: result.array().map((e) => ({
      field: e.param,
      msg: e.msg,
    })),
  });
}

module.exports = { handleValidationErrors };
