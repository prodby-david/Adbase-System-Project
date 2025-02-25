import express from 'express'
import Admin from '../models/admin';

const AdminRouter = express.Router();


AdminRouter.post('/api/admin', async (req,res) => {

    const { adminuser, adminpass, adminconfirmpass } = req.body;

    try{

        const userAdmin = await Admin.findOne({adminuser});

        if(userAdmin){
            return res.status(400).json({message: 'User already exist.'});
        }

        const newAdmin = new Admin({adminuser, adminpass, adminconfirmpass});
        await newAdmin.save();

    }
    catch(err){
        res.status(400).json({message: 'Sign up failed. Please try again', err});
    }

});

export default AdminRouter;


