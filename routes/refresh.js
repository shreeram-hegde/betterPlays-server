import express from "express";
import handleRefreshToken from "../controllers/refreshTokenController.js";

const refreshRoute = express.Router();

refreshRoute.post('/',handleRefreshToken);

export default refreshRoute;