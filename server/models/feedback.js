import mongoose from 'mongoose';

const userFeedbackSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
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
