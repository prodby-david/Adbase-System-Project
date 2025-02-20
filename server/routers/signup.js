import express from 'express'
import User from '../models/user';


const signUpRouter = express.Router();


signUpRouter.post('/signup', async (req,res) => {

    const {firstname, lastname, email, password} = req.body;

    try{
        let userEmail = await User.findOne({email});

        if(userEmail){
            return res.status(400).json({message: 'Email already exists'});
        }

        const newUser = new User({firstname,lastname,email,password});
        await newUser.save();

        return res.status(201).json({message: 'Sign up success'});

    }catch(err){
        res.status(400).json({message: 'Sign up failed. Please try again'});
    }   
})

export default signUpRouter;