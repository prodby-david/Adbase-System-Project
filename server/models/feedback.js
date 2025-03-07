import mongoose from 'mongoose';

const userFeedbackSchema = new mongoose.Schema({

    fullname:{
        type: String,
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
});

const Feedback = mongoose.model('Feedback', userFeedbackSchema);

export default Feedback;
