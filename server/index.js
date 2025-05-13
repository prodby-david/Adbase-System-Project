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
import OrderRouter from './routers/order.js';
import PurchaseRouter from './routers/user/purchase.js';
import EditProductStatus from './routers/admin/editProductStatus.js';
import { Server } from 'socket.io';
import http from 'http';


dotenv.config();
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
});

app.use(logger);

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: 'http://localhost:5173', 
credentials: true,
methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']}));

app.use('/uploads', express.static('uploads'));

app.use(signUpRouter, signInRouter, AdminRouter,
AdminLoginRouter, CreateFeedback, ForgotPassword, 
ResetPassword, ProductRouter, PurchaseRouter, OrderRouter, EditProductStatus );

server.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT: ${process.env.PORT}`);
    connectDB();
});

export { io };




