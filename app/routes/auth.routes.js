const authController = require("../controllers/auth.controller");
const { checkSchema } = require("express-validator");
const { registrationSchema } = require("../schemas/registrationSchema");
const { signInSchema } = require("../schemas/signInSchema");
const { verifyValidInputs } = require("../middleware/verifyValidInputs");
const verifySignIn = require("../middleware/verifySignIn");

const checkAndValidate = (schema) => {
  return [checkSchema(schema), verifyValidInputs];
};

module.exports = (app) => {
  app.post(
    "/api/auth/register",
    checkAndValidate(registrationSchema),
    authController.register
  );

  app.post(
    "/api/auth/signin",
    checkAndValidate(signInSchema),
    verifySignIn.checkUserCredentials,
    authController.signIn
  );
};
