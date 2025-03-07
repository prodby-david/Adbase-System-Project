import express from 'express';
import Feedback from "../models/feedback.js";


const CreateFeedback = express.Router();

CreateFeedback.post('/api/user-feedback', async (req, res) => {

    const { fullname, email, comment } = req.body;

    if (!fullname || !comment || !email) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newFeedback = new Feedback({
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

export default CreateFeedback;