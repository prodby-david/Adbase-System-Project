import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import signUpRouter from './routers/signup.js';
import signInRouter from './routers/signin.js';
import AdminRouter from './routers/admin-register.js';
import AdminLoginRouter from './routers/admin-login.js';
import CreateFeedback from './routers/create-feedback.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: 'http://localhost:5173' , credentials: true}));

app.use(signUpRouter);
app.use(signInRouter);
app.use(AdminRouter);
app.use(AdminLoginRouter);
app.use(CreateFeedback);


app.listen( process.env.PORT, () => {
    console.log(`Server is listening to PORT ${process.env.PORT}`);
    connectDB();
});


