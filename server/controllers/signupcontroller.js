import User from "../models/user.js";

const signUpController = async (req,res) => {

    const {firstname, lastname, email, password} = req.body;

    try{
        const userEmail = await User.findOne({email});

        if(userEmail){
            return res.status(400).json({message: 'Email already used.'});
        }

        const newUser = new User({firstname,lastname,email,password});
        await newUser.save();

        return res.status(201).json({message: 'Sign up success', success: true});

    }catch(err){
        res.status(400).json({message: 'Sign up failed. Please try again', err});
    }   
}

export default signUpController;