const index = (request, response, next) => {
  response
    .status(200)
    .json({ greeting: "Welcome to my API!", author: "Nathan James" });
};

export { index };
