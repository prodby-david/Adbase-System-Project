import mongoose from 'mongoose';

const userFeedbackSchema = new mongoose.Schema({

    email:{
        type: String,
        required: true
    },
    comment:{
        type: String,
        required: true
    }
}, {timestamps: true});

const Feedback = mongoose.model('Feedback', userFeedbackSchema);

export default Feedback;
