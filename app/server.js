import cors from "cors";
import express from "express";

const app = express();

const corsOptions = {
  origin: "*.nathanjms.co.uk",
};

app.use(cors(corsOptions));
// Parse requests of content-type - application/json
app.use(express.json());
// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// Handle 404
app.use(function (req, res) {
  res.send({ error_message: "Endpoint does not exist" }, 404);
});

/* Routes */

// Basic route
app.route("/").get((request, response) => {
  response
    .status(200)
    .json({ greeting: "Welcome to my Node API!", author: "Nathan James" });
});

// Routes from route configs
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

// Start server
let port = process?.env?.PORT ? process.env.PORT : 3002;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
