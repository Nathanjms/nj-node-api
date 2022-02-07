const { validationResult } = require("express-validator");

exports.verifyNoValidationErrors = (req, res, next, method) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  method(res,req,next);
};
