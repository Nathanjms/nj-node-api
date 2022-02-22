const index = {
  groupId: {
    in: ["query", "body"],
    optional: true,
    isInt: {
      errorMessage: "Group ID must be an integer.",
      bail: true,
    },
    toInt: true,
  },
  page: {
    in: ["query", "body"],
    isInt: {
      errorMessage: "Page must be an integer.",
      bail: true,
      options: { min: 1 },
    },
    toInt: true,
  },
  perPage: {
    in: ["query", "body"],
    isInt: {
      errorMessage: "Per Page must be an integer between 1 and 50.",
      bail: true,
      options: { min: 1, max: 50 },
    },
    toInt: true,
  },
};

const show = {
  movieId: {
    in: ["params"],
    notEmpty: {
      errorMessage: "Movie ID is required",
      bail: true,
    },
    isInt: {
      errorMessage: "Movie ID must be an integer.",
      bail: true,
    },
    toInt: true,
  },
};

const store = {
  title: {
    trim: true,
    notEmpty: {
      errorMessage: "Title is required",
      bail: true,
    },
    isLength: {
      options: { max: 255 },
      errorMessage: "Title must be no more than 255 characters.",
    },
  },
  tmdbId: {
    trim: true,
    notEmpty: {
      errorMessage: "TMDB ID is required",
      bail: true,
    },
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

const markAsSeen = {
  movieId: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Movie ID is required",
      bail: true,
    },
    isInt: {
      errorMessage: "Movie ID must be an integer.",
      bail: true,
    },
    toInt: true,
  },
  seen: {
    in: ["body"],
    isBoolean: true,
    toBoolean: true,
    errorMessage: "Seen must be a boolean.",
  },
};

const review = {
  movieId: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Movie ID is required",
      bail: true,
    },
    isInt: {
      errorMessage: "Movie ID must be an integer.",
      bail: true,
    },
    toInt: true,
  },
  rating: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Rating is required",
      bail: true,
    },
    isInt: {
      errorMessage: "Rating must be an integer between 1 and 5.",
      options: { min: 1, max: 5 },
      bail: true,
    },
    toInt: true,
  },
};

const remove = {
  movieId: {
    in: ["params"],
    notEmpty: {
      errorMessage: "Movie ID is required",
      bail: true,
    },
    isInt: {
      errorMessage: "Movie ID must be an integer.",
      bail: true,
    },
    toInt: true,
  },
};

module.exports = { index, show, store, markAsSeen, review, remove };
