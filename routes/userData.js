import express from "express";
import handleGameData from "../controllers/userDataController.js";
import handleDashBoardData from "../controllers/dashBoardController.js";
import verifyJWT from "../middleware/verifyJWT.js";


const userDataRouter = express.Router();

userDataRouter.post('/',verifyJWT,handleGameData);
userDataRouter.get('/', verifyJWT,handleDashBoardData);

export default userDataRouter;