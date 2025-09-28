import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    apiId: {
      type: Number,
      required: true,
      unique: true, // unique ID from external API
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Game", gameSchema);
