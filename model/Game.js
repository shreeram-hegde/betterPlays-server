import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true, // unique ID from external API
    },
    title: {
      type: String,
      required: true,
    },
    background_image:{
      type: String
    },
  },
  { timestamps: true }
);

export default mongoose.model("Game", gameSchema);
