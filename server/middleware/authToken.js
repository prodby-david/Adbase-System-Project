import jwt from 'jsonwebtoken'


const authToken = (req,res,next) => {
    
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    console.log(user_token);        

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