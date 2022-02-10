import cors from "cors";
import express from "express";
var jwt = require("jsonwebtoken");
const config = require("./config/auth.config");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
// Parse requests of content-type - application/json
app.use(express.json());
// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

/* Routes */

// Basic route
app.route("/").get((request, response) => {
  response
    .status(200)
    .json({ greeting: "Welcome to my Node API!", author: "Nathan James" });
});

app.get("/api/test", (req, res, next) => {
  verifyToken(req, res, next);
});

// // Routes from route configs
require("./routes/auth.routes")(app);
// require('./routes/user.routes')(app);

// Start server
let port = process?.env?.PORT ? process?.env?.PORT : 3002;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  let token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, "njdev", (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    return res.status(200).send({ success: true, userId: req.userId });
  });
};
