import express from "express";
import cors from "cors";
import "./db/dbConnection.js";
import errorHandler from "./middleware/errorHandler.js";
import leaderboardRouter from "./routes/leaderboardRouter.js";

const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/leaderboard", leaderboardRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
