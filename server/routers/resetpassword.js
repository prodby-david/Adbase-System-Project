import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';


const ResetPassword = express.Router();

ResetPassword.post('/api/reset-password/:token', async (req, res) => {

    const { password } = req.body;
    const { token } = req.params;

    if (!token) {
        return res.status(400).json({ message: 'No token provided.' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_FORGOT_PASSWORD_KEY);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(400).json({ message: 'User not found.' });
        }

        user.password = password; 
        await user.save();

        res.status(200).json({ message: 'Password reset successfully.' });
        
    } catch (err) {

        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Your reset link has expired. Please request a new one.' });
        }
        
        res.status(500).json({ message: err.message });
    }
});

export default ResetPassword;