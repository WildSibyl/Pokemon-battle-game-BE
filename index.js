import express from "express";
import "./db/dbConnection.js";
import errorHandler from "./middleware/errorHandler.js";

const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
