const movieGroupStoreSchema = {
  title: {
    trim: true,
    notEmpty: {
      errorMessage: "Title is required",
    },
    isLength: {
      options: { max: 255 },
      errorMessage: "Title must be no more than 255 characters.",
    },
  },
  tmdbId: {
    optional: true,
    trim: true,
    isLength: {
      options: { max: 255 },
      errorMessage: "TMID must be no more than 255 characters.",
    },
  },
  posterPath: {
    optional: true,
    trim: true,
    isLength: {
      options: { max: 255 },
      errorMessage: "Poster path must be no more than 255 characters.",
    },
  },
  groupId: {
    optional: true,
    isInt: {
      errorMessage: "Group ID must be an integer.",
    },
    toInt: true,
  },
};

module.exports = { movieGroupStoreSchema };
