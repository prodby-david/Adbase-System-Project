import jwt from 'jsonwebtoken';


const authAdminToken = (req,res,next) => {

    const admin_token = req.cookies.token;

    if(!admin_token){
        return res.status(401).json({message: 'No token provided. Authorization denied.'});
    }

    try{

        const verifyAdminToken = jwt.verify(admin_token, process.env.JWT_ADMIN_KEY);
        req.user = verifyAdminToken;

        console.log('Admin token verified:', verifyAdminToken);

        next();

    }catch(err){
        return res.status(401).json({message: 'Invalid or expired token.'});
    }
}

export default authAdminToken;