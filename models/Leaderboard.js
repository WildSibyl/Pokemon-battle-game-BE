import mongoose from "mongoose";
import Counter from "./models/Counter.js";

const leaderboardSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  username: { type: String, required: true },
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

// Auto-increment logic
leaderboardSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "leaderboard_id" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.sequence_value;
  }
  next();
});

module.exports = mongoose.model("Leaderboard", leaderboardSchema);
