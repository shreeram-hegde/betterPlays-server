import jwt from "jsonwebtoken";

const verifyJWT = (req,res,next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader?.startsWith('Bearer ')) return res.status(401);
    const token = authHeader.split(' ')[1];
    console.log(token); //gotta remove this
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            console.log(err);
            if(err) return res.sendStatus(403);
            req.user = decoded.username;
            //If role is to be used use it here
            next();
        }
    );
}

export default verifyJWT;