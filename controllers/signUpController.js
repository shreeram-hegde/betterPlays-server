import User from "../model/User.js";
import bcrypt from 'bcrypt';

const handleNewUser = async (req, res) => {
    const {user, mail , pwd} = req.body;
    if(!user || !mail || !pwd) return res.status(400).json({'message' : 'Username, Email and Password are required'});

    //check if the user already exists
    const duplicateMail = await User.findOne({email: mail}).exec();
    if(duplicateMail) return res.status(409).json({'message': 'This email already exists'});
    const duplicateUsername = await User.findOne({username : user});
    if(duplicateUsername) return res.status(409).json({'message': 'This username is already taken'});

    try{
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd,10);

        //create and store the new user
        const result = await User.create({
            username: user,
            email: mail,
            password: hashedPwd
        });

        
        res.status(201).json({'success': `New user ${user} with Email ${mail} created`});

    }catch(error){
        res.status(500).json({'message':error.message});
    }
}


export default handleNewUser;