import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();


app.listen( process.env.PORT, () => {
    console.log(`Server is listening to PORT ${process.env.PORT}`);
    connectDB();
});


