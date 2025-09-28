import mongoose from "mongoose";

const dbNotifier = () => {
  console.log("DataBase Connected");
};

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", dbNotifier);
    await mongoose.connect(`${process.env.MONGO_URI}/betterPlays`);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;