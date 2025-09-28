import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const handleLogin = async (req, res) =>{
    const {mail, pwd} = req.body;
    if(!mail || !pwd) return res.status(400).json({'message': 'Requires both Mail and Password.'});

    const foundUser = await User.findOne({email: mail}).exec();
    if(!foundUser) return res.status(401).json({'message':'User Not found'});
    
    const match = await bcrypt.compare(pwd,foundUser.password);
    if(match){
        const accessToken  = jwt.sign(
            {"username": foundUser.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '15m'}
        );
        const refreshToken  = jwt.sign(
            {"username": foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '7d'}
        );
        //saving it to the user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result); //Gotta remove this
        //Creates Secure Cookie with refresh token
        res.cookie('jwt',refreshToken,{httpOnly : true, secure:false, sameSite:'None',maxAge: 24*60*60*7*1000}); //Gotta change this to secure:true in prod
        //Send access token to user
        res.json({accessToken});
    }else{
        res.sendStatus(401).json({'message':'Wrong password'});
    }
}

export default handleLogin;