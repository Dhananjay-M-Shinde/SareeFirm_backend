const connection = require('../utilities/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'dwhhj34hfkffotoidffo89t8uwfkqefkjshfiow';

let login = {};

login.userLogin = async(req, res, data) =>{
    let {Email, Password} = data;
    let model = await connection.getAllBranch();
    let user = await model.findOne({Email:Email}).lean();

    if(!user){
        return res.json({status:"error", error:"user not found"});
    }

    if(await bcrypt.compare(Password, user.Password)){
        let token = jwt.sign(
            {id:user._id, username:user.Branch_name}
            , 
            JWT_SECRET
        );
        return res.json({status:201, data:{token, Branch_Id: user.Branch_Id}}); 
    }

    res.json({status:401, error:"username or password is incorrect"});
}

// change password logic is not implemeted yet.this is also related to jwttoken. for change password or forget password logic I have to use mobile or email otp based verification 
// checkout the video node.js registration and login tutorial by codedamm
module.exports = login;