import User from "../../models/user.js";


const CountUser = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        res.status(200).json({ totalUsers });
    } catch (error) {
        console.error('Error counting users:', error);
        res.status(500).json({ message: 'Error counting users', error });
    }
};

export default CountUser;