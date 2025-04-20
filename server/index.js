import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import signUpRouter from './routers/signup.js';
import signInRouter from './routers/signin.js';
import AdminRouter from './routers/admin/admin-register.js';
import AdminLoginRouter from './routers/admin/admin-login.js';
import CreateFeedback from './routers/user/create-feedback.js';
import ForgotPassword from './routers/forgotpassword.js';
import ResetPassword from './routers/resetpassword.js';
import ProductRouter from './routers/admin/product.js';
import logger from './middleware/logger.js';


dotenv.config();
const app = express();

app.use(logger);

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: 'http://localhost:5173', 
credentials: true,
methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']}));

app.use(signUpRouter, signInRouter, AdminRouter,
AdminLoginRouter, CreateFeedback, ForgotPassword, 
ResetPassword, ProductRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT: ${process.env.PORT}`);
    connectDB();
});




