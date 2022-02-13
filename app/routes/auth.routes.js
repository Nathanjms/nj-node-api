const authController = require("../controllers/auth.controller");
const { registrationSchema } = require("../schemas/registrationSchema");
const { signInSchema } = require("../schemas/signInSchema");
const { checkAndValidateSchema } = require("../middleware/verifyValidInputs");
const verifySignIn = require("../middleware/verifySignIn");

module.exports = (app) => {
  app.post(
    "/api/auth/register",
    checkAndValidateSchema(registrationSchema),
    authController.register
  );

  app.post(
    "/api/auth/signin",
    checkAndValidateSchema(signInSchema),
    verifySignIn.checkUserCredentials,
    authController.signIn
  );
};
