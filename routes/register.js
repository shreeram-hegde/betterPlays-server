import express from "express"
import handleNewUser from '../controllers/signUpController.js';

const registerRouter = express.Router();

registerRouter.post('/', handleNewUser);

export default registerRouter;