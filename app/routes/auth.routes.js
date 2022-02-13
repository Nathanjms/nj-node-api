const authController = require("../controllers/auth.controller");
const { registrationSchema } = require("../schemas/registrationSchema");
const { signInSchema } = require("../schemas/signInSchema");
const { checkAndValidate } = require("../middleware/verifyValidInputs");
const verifySignIn = require("../middleware/verifySignIn");

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
