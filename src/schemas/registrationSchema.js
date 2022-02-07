const registrationSchema = {
  name: {
    notEmpty: true,
    trim: true,
    escape: true,
    errorMessage: "Name must not be empty",
  },
  password: {
    notEmpty: true,
    isLength: {
      options: {
        min: 6,
      },
    },
    errorMessage: "Password must be greater than 5 characters",
  },
  password_confirm: {
    notEmpty: true,
    custom: {
      options: (password_confirm, { req }) => {
        const password = req.body.password;
        // If password and confirm password not same
        // don't allow to sign up and throw error
        if (password !== password_confirm) {
          throw new Error("Passwords must be same");
        }
        return Promise.resolve();
      },
    },
  },
  email: {
    notEmpty: true,
    isEmail: true,
    errorMessage: "Must be a valid Email",
  },
};

module.exports = { registrationSchema };
