const signInSchema = {
  password: {
    trim: true,
    notEmpty: true,
    errorMessage: "A Password is required",
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
};

module.exports = { signInSchema };
