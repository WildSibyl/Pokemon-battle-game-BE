import ErrorResponse from "../utils/ErrorResponse.js";
import Leaderboard from "../models/Leaderboard.js";

// GET
export const getAllEntries = async (req, res, next) => {
  try {
    const entries = await Leaderboard.find();
    res.json(entries);
  } catch (err) {
    next(new ErrorResponse("Failed to fetch all leaderboard entries.", 500));
  }
};

// GET
export const getEntryById = async (req, res, next) => {
  try {
    const entry = await Leaderboard.findOne({ id: parseInt(req.params.id) });
    if (!entry) {
      return next(new ErrorResponse("Entry not found.", 404));
    }
    res.json(entry);
  } catch (err) {
    next(new ErrorResponse("Failed to fetch entry.", 500));
  }
};

// POST
export const createEntry = async (req, res, next) => {
  const { username, score } = req.body;

  if (!username || score == null) {
    return next(new ErrorResponse("Username and score are required.", 400));
  }

  try {
    const entry = new Leaderboard({ username, score });
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    next(new ErrorResponse("Failed to create leaderboard entry.", 500));
  }
};

// PUT
export const updateEntryById = async (req, res, next) => {
  const { username, score } = req.body;

  if (username == null && score == null) {
    return next(
      new ErrorResponse(
        "At least one of username or score must be provided.",
        400
      )
    );
  }

  try {
    const updated = await Leaderboard.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      {
        $set: {
          ...(username && { username }),
          ...(score != null && { score }),
        },
      },
      { new: true }
    );

    if (!updated) {
      return next(new ErrorResponse("Entry not found.", 404));
    }

    res.json(updated);
  } catch (err) {
    next(new ErrorResponse("Failed to update entry.", 500));
  }
};

// DELETE
export const deleteEntryById = async (req, res, next) => {
  try {
    const result = await Leaderboard.findOneAndDelete({
      id: parseInt(req.params.id),
    });
    if (!result) {
      return next(new ErrorResponse("Entry not found.", 404));
    }
    res.json({ message: "Entry deleted successfully." });
  } catch (err) {
    next(new ErrorResponse("Failed to delete entry.", 500));
  }
};
