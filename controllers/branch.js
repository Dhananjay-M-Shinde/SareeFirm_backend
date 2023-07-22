const modelbranch = require('../models/branch');

let branch = {};

branch.getAllBranch = async() =>{
    let allBranch = await modelbranch.getBranch();
    if(allBranch){
        return allBranch;
    }else{
        let err = new Error("some error occur at branch controller");
        err.status = 401;
        throw err;
    }
}

branch.addNewBranch = async(req, res,newBranch) =>{
    let newBranchadded = await modelbranch.addNewBranch(req, res,newBranch);
    if(newBranchadded){
        return true;
    }else{
        let err = new Error("some error occure while adding new branch");
        err.status = 401;
        throw err;
    }
}

branch.register = async(req, res,newBranch, otp) =>{
    let otpVerified = await modelbranch.register(req, res,newBranch, otp);
}

branch.updateDetails = async(detailsObj, branch_id) =>{
    let update_details = await modelbranch.updateDetails(detailsObj, branch_id);
    if(update_details){
        return true;
    }else{
        let err = new Error("some error occur while updating details");
        err.status = 401;
        throw err;
    }
}

branch.deleteBranch = async(branch_id) =>{
    let delete_Branch = await modelbranch.deleteBranch(branch_id);
    if(delete_Branch){
        return true;
    }else{
        let err = new Error("some error occure while removing branch");
        err.status = 401;
        throw err;
    }
}


module.exports = branch;