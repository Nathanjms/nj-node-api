import express from "express";
import cors from "cors";
import { index } from "./get/index";
import { getGroupId } from "./get/users";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
// Parse requests of content-type - application/json
app.use(express.json());
// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


/* Routes */
app.route("/").get(index);
app.route("/api/users").get(getGroupId);


// Start server
let port = process?.env?.PORT ? process?.env?.PORT : 3002;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
