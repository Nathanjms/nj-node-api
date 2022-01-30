import express from "express";
import cors from "cors";
import { index } from "./get/index";
import { getGroupId } from "./get/users";

const app = express();

app.use(cors());
app.use(express.json());
//An error handling middleware
app.use(function (err, req, res, next) {
  return res.status(500).json("ERROR!!!");
});

app.route("/").get(index);
app.route("/api/users").get(getGroupId);

// Start server
let port = process.env.PORT ? process.env.PORT : 3002;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
