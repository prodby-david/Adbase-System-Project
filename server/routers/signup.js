import express from 'express'
import signUpController from '../controllers/signupcontroller.js';


const signUpRouter = express.Router();


signUpRouter.post('/api/signup', signUpController);

export default signUpRouter;