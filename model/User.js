import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        trim:true,
        unique: true,
        minlength: 3,
        maxlength: 30,
    },
    email:{
        type: String,
        required: true,
        trim:true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    //Games related fields
      currentlyPlaying: [
    {
      game: { type: mongoose.Schema.Types.ObjectId, ref: "Game" },
      dateAdded: { type: Date, default: Date.now }
        }
    ],
    completedGames: [
        {
        game: { type: mongoose.Schema.Types.ObjectId, ref: "Game" },
        dateAdded: { type: Date, default: Date.now }
        }
    ],
    wishList: [
        {
        game: { type: mongoose.Schema.Types.ObjectId, ref: "Game" },
        dateAdded: { type: Date, default: Date.now }
        }
    ],

    //Auth
    refreshToken: {
      type: String, // store refresh token (optional if you’re using JWT refresh flow)
    },

}
, { timestamps: true });

export default mongoose.model("User", userSchema);