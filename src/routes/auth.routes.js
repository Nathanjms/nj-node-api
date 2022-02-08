const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const { checkSchema } = require("express-validator");
const { registrationSchema } = require("../schemas/registrationSchema");
const { signInSchema } = require("../schemas/signInSchema");
const {
  verifyNoValidationErrors,
} = require("../middleware/verifyNoValidationErrors");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [checkSchema(registrationSchema), verifyNoValidationErrors],
    controller.signup
  );

  app.post("/api/auth/signin", checkSchema(signInSchema), controller.signin);
};
