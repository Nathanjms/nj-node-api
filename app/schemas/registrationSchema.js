require("dotenv").config();
const registrationSchema = {
  name: {
    notEmpty: {
      errorMessage: "Name is required",
    },
    trim: true,
    escape: true,
  },
  password: {
    trim: true,
    notEmpty: {
      errorMessage: "Password is required",
      bail: true,
    },
    isLength: {
      options: {
        min: 6,
      },
    },
    errorMessage: "Password must be greater than 5 characters",
  },
  passwordConfirm: {
    trim: true,
    notEmpty: {
      errorMessage: "Password confirmation is required",
      bail: true,
    },
    custom: {
      options: (passwordConfirm, { req }) => {
        const password = req.body.password;
        // If password and confirm password not same
        // don't allow to sign up and throw error
        if (password !== passwordConfirm) {
          throw new Error("Password and password confirmation must match");
        }
        return true;
      },
    },
  },
  email: {
    trim: true,
    notEmpty: {
      errorMessage: "Email is required",
      bail: true,
    },
    isEmail: {
      errorMessage: "Must be a valid Email",
      bail: true,
    },
  },
  superSecretSignUpKey: {
    trim: true,
    notEmpty: {
      errorMessage: "SignUp key is required",
      bail: true,
    },
    equals: {
      options: process.env.SIGN_UP_KEY,
      errorMessage: "Invalid SignUp Key",
    },
  },
};

module.exports = { registrationSchema };
