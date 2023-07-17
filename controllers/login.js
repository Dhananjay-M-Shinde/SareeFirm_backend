const modelLogin = require('../models/login');

let login = {};

login.userLogin = async(req, res, data) =>{
    let user = modelLogin.userLogin(req, res, data);
    if(user){
        return user;
    }else{
        let err = new Error("some error occur while checking user data for login");
        err.status = 401;
        throw err;
    }
}

module.exports = login;