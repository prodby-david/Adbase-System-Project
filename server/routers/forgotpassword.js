import express from 'express';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from '../models/user.js';



const ForgotPassword = express.Router();

ForgotPassword.post('/api/forgot-password', async (req, res) => {

    const { email } = req.body;
    console.log("Email received from frontend:", email);

    try{

        const user = await User.findOne({ email });

        if(!user) {
            return res.status(404).json({ message: "Email doesn't exist. Please check your email." });
        }
    
        const token = jwt.sign({ id:user._id }, process.env.JWT_FORGOT_PASSWORD_KEY, { expiresIn: '15m' });
    
        res.cookie('resetToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 15 * 60 * 1000, 
          });
    
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });
    
          await transporter.sendMail({
            from: `Ovenly Hazel <${process.env.EMAIL_USER}>`,
            to: email,  
            subject: 'Password Reset',
            html: `<p>Click <a href="http://localhost:5173/reset-password/${token}">here</a> to reset your password.</p>`,
          });

          return res.status(200).json({ message: 'Reset link sent successfully.' });
    
    }catch(err){
        res.status(500).json({ message: err.message });
        console.log(err.message)
    }
});

export default ForgotPassword;