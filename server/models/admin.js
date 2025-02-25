import mongoose from 'mongoose'


const adminSchema = mongoose.Schema({
    admin_user:{
        type: String,
        required: true
    },
    admin_passwrd:{
        type: String,
        required: true
    },
})

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;