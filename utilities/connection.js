const mongoose = require('mongoose');
mongoose.Promise=global.Promise;
const url = "mongodb://localhost:27017/SareeFirmDB";

const branchSchema = new mongoose.Schema({
  Branch_Id: {
    type: Number,
    required: true,
    unique: true
  },
  Branch_name: {
    type: String,
    required: true
  },
  Owner_name: {
    type: String,
    required: true
  },
  Contact: {
    type: String,
    required: true
  },
  Address: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true,
    unique: true
  }
}, {collection:"branch", timestamps: true});


let collection = {};

collection.getAllBranch = async() => {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/SareeFirmDB',{useNewUrlParser:true});
        let model = await mongoose.model("branch", branchSchema);
        return model;
    }catch(err){
        let error = new Error("could not connect to database");
        error.status = 500;
        throw error;
    }
};

collection.getName = async() => {
    console.log("inside connection name");
    await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
    let model = await mongoose.model("first", firstSchema);
    return model;
}



module.exports = collection;
