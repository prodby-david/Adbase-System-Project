import mongoose from "mongoose";

const connectDB = async () => {

    try{
        const con = mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected successfully.');
    }catch(err){
        console.error('Database connected unsuccessfully.', err);
        process.exit(1);
    }
}
export default connectDB;