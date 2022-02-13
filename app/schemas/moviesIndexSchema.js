const moviesIndexSchema = {
  groupId: {
    in: ["query"],
    optional: true,
    isInt: {
      errorMessage: "Group ID must be an integer.",
      bail: true,
    },
    toInt: true,
  },
};

module.exports = { moviesIndexSchema };
