const connection = require('../utilities/connection');


let branch = {};

branch.getBranch = async() =>{
    let model = await connection.getAllBranch();

    let allBranch = await model.find({}, {_id:0, Password:0});

    if(allBranch){
        return allBranch;
    }else{
        console.log("couldn't fetch allbranch");
        return null;
    }
}

branch.addNewBranch = async(NewBranch) =>{
    let model = await connection.getAllBranch();
    let newBranchAdded = await model.insertMany(NewBranch);
    
    if(newBranchAdded){
        return true;
    }else{
        let err = new Error("some error occure while inserting new branch");
        err.status = 401;
        throw err;
    }
}

branch.updateDetails = async(detailsObj, branch_id) =>{
    let model = await connection.getAllBranch();
    let update_details = await model.updateOne(
        {Branch_Id:branch_id},
        {
            $set:{
                Branch_name:detailsObj.Branch_name,
                Owner_name:detailsObj.Owner_name,
                Contact:detailsObj.Contact,
                Address:detailsObj.Address,
                Email:detailsObj.Email
                }
            }
        );

    if(update_details){
        return true;
    }else{
        let err = new Error("some error occur while updating details");
        err.status = 401;
        throw err;
    }
}

branch.deleteBranch = async(branch_id) =>{
    let model = await connection.getAllBranch();
    let delete_branch = await model.deleteOne({Branch_Id:branch_id});

    if(delete_branch){
        return true;
    }else{
        let err = new Error("some error occure while removing branch");
        err.status = 401;
        throw err;    
    }
}

module.exports = branch;