import express from 'express'
import Admin from '../models/admin.js';

const AdminRouter = express.Router();


AdminRouter.post('/api/admin-registration', async (req,res) => {

    try{

        const { adminusername, adminpassword } = req.body;

        if (!adminusername || !adminpassword) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const userAdmin = await Admin.findOne({adminusername});

        if(userAdmin){
            return res.status(400).json({message: 'User already exist.'});
        }

        const newAdmin = new Admin({adminusername, adminpassword});

        await newAdmin.save();

        res.status(200).json({message: 'Admin registered successfully'});

    }
    catch(err){
        console.log(err);
        res.status(400).json({message: 'Sign up failed. Please try again'});
    }

});

export default AdminRouter;


