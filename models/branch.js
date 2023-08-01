const connection = require('../utilities/connection');
const auth = require('../config/auth');
const NewBranch = require('./newBranch');


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

branch.addNewBranch = async(req, res,NewBranch) =>{
  const Email = NewBranch.Email;
  let model = await connection.getAllBranch();
  // Check if the email is already registered
  const userExists = await model.findOne({ Email });
  if (userExists) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  // Generate OTP
  const otp = await auth.generateOtp();
  console.log(otp, "this is opt generated");

  // Send OTP to the user's email
  await auth.sendOTP(Email, otp);
  console.log("after send otp");

  // Respond with the generated OTP (for client-side verification)
  return res.status(201).json({ message: 'OTP sent to your email', otp });
}

branch.register = async(req, res,NewBranch, otp) =>{
  // Check if the OTP matches
  if (Number(auth.ottp[0]) !== Number(otp)) {
    console.log("otp not matched");
    return res.status(401).json({ message: 'Incorrect OTP' });
  }
  // Store the user data in the database
  let model = await connection.getAllBranch();
  
  let branchInserted = await model.insertMany(NewBranch);
 
  console.log(branchInserted);

  res.json({ message: 'Registration successful' });
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