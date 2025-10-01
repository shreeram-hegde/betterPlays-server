import express from "express";
import handleDetails from "../controllers/gameDetailsController.js";

const gameDetailsRouter = express.Router();

gameDetailsRouter.get('/', handleDetails);

export default gameDetailsRouter;