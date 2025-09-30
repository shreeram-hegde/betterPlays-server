import User from "../model/User.js";

const handleLogout = async (req, res) => {
    //maybe delete access token on the frontend, or else froget about it. You're supposed to do that but this is a small project and acess token is only valid for 15 mins
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204);//No content
    const refreshToken = cookies.jwt;

    //check for refreshToken in DB
    const foundUser = await User.findOne({refreshToken}).exec();

    if(!foundUser){
        res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true}); //Gotta make secure true for the prod
        res.sendStatus(204);
    }

    //Delete refreshToken from the db
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result); //Gotta delete this

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); //Gotta change this, make secure:true for the prod
    res.sendStatus(204);

}

export default handleLogout;