import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from "../../models/admin.js";


const AdminLoginRouter = express.Router();


AdminLoginRouter.post('/api/admin/sign-in', async (req,res) => {

    try {
        const {adminusername, adminpassword} = req.body;

        const adminUser = await Admin.findOne({adminusername});

        if(!adminUser){
            return res.status(400).json({message: 'Admin username not found'});
        }

        const passwordMatch = await bcrypt.compare(adminpassword, adminUser.adminpassword);

        if(!passwordMatch){
           return res.status(400).json({message: 'Incorrect password'});
        }

        const admintoken = jwt.sign({adminId: adminUser._id}, process.env.JWT_ADMIN_KEY, {expiresIn: '1h'});

        res.cookie('token', admintoken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000,
            sameSite: 'Strict'
        });

        res.status(200).json({ success: true, message: 'Login successful',
            admin: {
            adminusername: adminUser.adminusername
          }});
    }
    catch(err) {
        console.error("Login error:", err);
        res.status(400).json({message: 'Please try again later.'});
    }
});

export default AdminLoginRouter;