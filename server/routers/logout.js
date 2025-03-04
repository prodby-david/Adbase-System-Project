
const LogoutUser = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0) 
    });
    res.json({ message: "Logged out successfully" });
};

export default LogoutUser;
