import express from "express";
import handleLogout from "../controllers/logoutController.js";

const logOutRoute = express.Router();

logOutRoute.post('/',handleLogout);

export default logOutRoute;