import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({

    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    stocks:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
        unique: true
    },
    imageHash: {
        type: String,
        required: true,
        unique: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
    }
},  {timestamps: true}
);

const Product = mongoose.model('Product', productSchema);

export default Product;