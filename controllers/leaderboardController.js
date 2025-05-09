import ErrorResponse from "../utils/ErrorResponse.js";
import Leaderboard from "../models/Leaderboard.js";

// GET all entries
export const getAllEntries = async (req, res) => {
  try {
    const entries = await Leaderboard.find();
    res.json(entries);
  } catch (err) {
    const error = new ErrorResponse(
      "Failed to fetch all leaderboard entries.",
      500
    );
    res.status(error.statusCode).json({ error: error.message });
  }
};

// GET entry by ID
export const getEntryById = async (req, res) => {
  try {
    const entry = await Leaderboard.findById(req.params.id);
    if (!entry) {
      const error = new ErrorResponse("Entry not found.", 404);
      return res.status(error.statusCode).json({ error: error.message });
    }
    res.json(entry);
  } catch (err) {
    const error = new ErrorResponse("Failed to fetch entry.", 500);
    res.status(error.statusCode).json({ error: error.message });
  }
};

// POST new entry
export const createEntry = async (req, res) => {
  const { username, score } = req.body;

  if (!username || score == null) {
    const error = new ErrorResponse("Username and score are required.", 400);
    return res.status(error.statusCode).json({ error: error.message });
  }

  try {
    const entry = new Leaderboard({ username, score });
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    const error = new ErrorResponse("Failed to create leaderboard entry.", 500);
    res.status(error.statusCode).json({ error: error.message });
  }
};

// PUT update entry
export const updateEntryById = async (req, res) => {
  const { username, score } = req.body;

  if (username == null && score == null) {
    const error = new ErrorResponse(
      "At least one of username or score must be provided.",
      400
    );
    return res.status(error.statusCode).json({ error: error.message });
  }

  try {
    const updates = {
      ...(username && { username }),
      ...(score != null && { score }),
    };

    const updated = await Leaderboard.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    );

    if (!updated) {
      const error = new ErrorResponse("Entry not found.", 404);
      return res.status(error.statusCode).json({ error: error.message });
    }

    res.json(updated);
  } catch (err) {
    const error = new ErrorResponse("Failed to update entry.", 500);
    res.status(error.statusCode).json({ error: error.message });
  }
};

// DELETE entry
export const deleteEntryById = async (req, res) => {
  try {
    const result = await Leaderboard.findByIdAndDelete(req.params.id);
    if (!result) {
      const error = new ErrorResponse("Entry not found.", 404);
      return res.status(error.statusCode).json({ error: error.message });
    }
    res.json({ message: "Entry deleted successfully." });
  } catch (err) {
    const error = new ErrorResponse("Failed to delete entry.", 500);
    res.status(error.statusCode).json({ error: error.message });
  }
};
