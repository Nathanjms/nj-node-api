const { checkSchema, validationResult } = require("express-validator");

const verifyValidInputs = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array(),
    });
  }

  next();
};

const checkAndValidate = (schema) => {
  return [checkSchema(schema), verifyValidInputs];
};

module.exports = { verifyValidInputs, checkAndValidate };
