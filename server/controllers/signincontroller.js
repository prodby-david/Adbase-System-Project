import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';


const signInController = async (req,res) => {

    const { email, password } = req.body;

    try{
        const user = await User.findOne({email});

        if(!user){
            
            res.status(400).json({message: "Email doesn't exist."});
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            res.status(400).json({message: 'Incorrect password'});
            return;
        }

        const user_token = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});

        res.cookie('token', user_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000,
            sameSite: 'Strict'
        });

        res.status(200).json({message: 'Logged in successfully', success: true, user:{
                firstname: user.firstname, 
                lastname: user.lastname,
                email: user.email
        }});
    }
    catch(err){
        res.status(500).json({message: 'Please try again later.'});
        
    }

}

export default signInController;