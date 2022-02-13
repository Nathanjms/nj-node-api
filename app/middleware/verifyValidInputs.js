const { checkSchema, validationResult } = require("express-validator");

const verifyValidInputs = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({
      validationErrors: errors.array(),
    });
  }
  return next();
};

const checkAndValidateSchema = (schema) => {
  return async (req, res, next) => {
    await checkSchema(schema).run(req);
    return verifyValidInputs(req, res, next);
  };
};

const checkAndValidateMultiple = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};

module.exports = { checkAndValidateSchema, checkAndValidateMultiple };
