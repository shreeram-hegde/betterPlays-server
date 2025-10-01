import express from "express";
import handleGameData from "../controllers/userDataController.js";
import verifyJWT from "../middleware/verifyJWT.js";


const userDataRouter = express.Router();

userDataRouter.post('/',verifyJWT,handleGameData);

export default userDataRouter;