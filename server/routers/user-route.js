import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';


const UserRouter = express.Router();

UserRouter.post('/user', async (req, res) => {


    try {
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({error: 'Unauthorized'});
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
    
        if(!user){
            return res.status(401).json({error: 'User not found'});
        }
    }catch(err){
        return res.status(500).json({error: 'Unexpected Error'});
    }
});

export default UserRouter;