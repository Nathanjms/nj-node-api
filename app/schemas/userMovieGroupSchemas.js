const store = {
  name: {
    trim: true,
    notEmpty: {
      errorMessage: "Name is required",
    },
    isLength: {
      options: { max: 255 },
      errorMessage: "Name must be no more than 255 characters.",
    },
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
}

module.exports = { store };
