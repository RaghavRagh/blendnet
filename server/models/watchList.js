import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  symbols: [{ type: String, required: true }],
});

export default mongoose.model("Watchlist", watchlistSchema);
