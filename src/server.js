import express from "express";
import { pool } from "../config";
import cors from "cors";
import { index } from "./get/index";

const app = express();
app.use(cors());
app.use(express.json());

app.route("/").get(index);

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`);
});
