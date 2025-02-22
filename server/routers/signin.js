import express from 'express';
import signInController from '../controllers/signincontroller.js';



const signInRouter = express.Router();

signInRouter.post('/api/signin', signInController);

export default signInRouter;