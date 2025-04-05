import express from 'express';
import Feedback from "../models/feedback.js";
import authToken from '../middleware/authToken.js';


const CreateFeedback = express.Router();

CreateFeedback.post('/api/user-feedback', authToken, async (req, res) => {

    console.log("User data from authToken middleware:", req.user);

    try {
        const userId = req.user.userId;
        const { fullname, email, comment } = req.body;

        if (!fullname || !email || !comment) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newFeedback = new Feedback({
            userId: userId, 
            fullname,
            email,
            comment
        });
        
        await newFeedback.save();

        res.status(201).json({ message: 'Feedback submitted.' });

    } catch (error) {
        res.status(500).json({ message: 'Unexpected error occurred.' });
    }
});

CreateFeedback.get('/api/user-feedback', async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: 'Unexpected error occurred.', error: error.message });
    }
});


export default CreateFeedback;