const signInSchema = {
  password: {
    notEmpty: true,
    errorMessage: "password is required",
  },
  email: {
    notEmpty: true,
    isEmail: true,
    errorMessage: "Must be a valid Email",
  },
};

module.exports = { signInSchema };
