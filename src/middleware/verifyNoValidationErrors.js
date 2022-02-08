const { validationResult } = require("express-validator");

exports.verifyNoValidationErrors = (req, res) => {
  const errors = validationResult(req);
  console.log(errors.array());
  // if (!errors.isEmpty()) {
  //   return res.status(400).send({ errors: errors.array() });
  // }
  return { success: errors.isEmpty(), errors: errors.array() };
};
