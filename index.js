import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./configs/db.js"
import registerRouter from "./routes/register.js";
import authRouter from "./routes/login.js";
import refreshRoute from "./routes/refresh.js";
import logOutRoute from "./routes/logout.js";
import gamesRouter from "./routes/games.js";
import cookieParser from "cookie-parser";
const PORT = 3500;
import cors from "cors";



connectDB();
const app = express();

app.use(cors({
  origin: "http://localhost:8080", // your frontend URL
  credentials: true               // allow cookies
}));
//middle-ware for json
app.use(express.json());
//middleware for cookie-parsing
app.use(cookieParser());

app.use('/register',registerRouter);
app.use('/login',authRouter);
app.use('/refresh',refreshRoute);
app.use('/logout',logOutRoute);
app.use('/api/games',gamesRouter);

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));

