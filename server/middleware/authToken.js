import jwt from 'jsonwebtoken'


const authToken = (req,res,next) => {

    const user_token = req.cookies.token;

    if(!user_token){
        return res.status(400).json({message: 'No token provided. Authorization denied.'});
    }

    try {
        const verifyToken = jwt.verify(user_token, process.env.JWT_SECRET_KEY);
        req.user = verifyToken;

        next();
    }
    catch(err){
        return res.status(400).json({message: 'Invalid or expired token.'});
    }
}

export default authToken;