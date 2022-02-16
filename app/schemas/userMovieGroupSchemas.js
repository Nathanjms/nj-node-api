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
}

module.exports = { store };
