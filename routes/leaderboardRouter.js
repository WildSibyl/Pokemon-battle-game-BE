import { Router } from "express";
import {
  getAllEntries,
  getEntryById,
  createEntry,
  updateEntryById,
  deleteEntryById,
} from "../controllers/leaderboardController.js";

const leaderboardRouter = Router();

leaderboardRouter.route("/").get(getAllEntries).post(createEntry);
leaderboardRouter
  .route("/:id")
  .get(getEntryById)
  .put(updateEntryById)
  .delete(deleteEntryById);

export default leaderboardRouter;
