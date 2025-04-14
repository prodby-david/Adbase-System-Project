import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';


const ResetPassword = express.Router();

ResetPassword.post('/api/reset-password', async (req, res) => {

    const { password } = req.body;
    const token = req.cookies.resetToken;

    if (!token) {
        return res.status(400).json({ message: 'No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_FORGOT_PASSWORD_KEY);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(400).json({ message: 'User not found.' });
        }

        user.password = await bcrypt.hash(password, 10); 
        await user.save();

        res.clearCookie('resetToken');
        res.status(200).json({ message: 'Password reset successfully.' });
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});