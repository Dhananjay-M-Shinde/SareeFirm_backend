const mongoose = require('mongoose');
mongoose.Promise=global.Promise;
const url = 'mongodb://127.0.0.1:27017/SareeFirmDB';


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

const productSchema = new mongoose.Schema({
  Product_Id: {
    type: Number,
    required: true
  },
  Branch_Id: {
    type: Number,
    required: true
  },
  Product_name: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Fabric: {
    type: String,
    required: true
  },
  Price_range: {
    type: String,
    required: true
  },
  Varients: [
    {
      Color: {
        type: String,
        required: true
      },
      Price: {
        type: Number,
        required: true
      },
      Design: {
        type: String,
        required: true
      },
      Image: {
        type: String,
        required: true
      },
      Quantity_Available: {
        type: Number,
        required: true
      }
    }
  ]
}, {collection:"inventory", timestamps:true});


const salesSchema = new mongoose.Schema({
  salesId: {
  type: Number,
  required : true,
  unique: true
  },
  customerName: {
    type: String,
    required: true
  },
  customerMobile: {
    type: String,
    required: true
  },
  salesDate: {
    type: Date,
    required: true
  },
  productCart: [
    {
      productId: {
        type: Number,
        required: true
      },
      branchId: {
        type: Number,
        required: true
      },
      productName: {
        type: String,
        required: true
      },
      color: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      totalAmount: {
        type: Number,
        required: true
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  }
}, {collection:"saless", timestamps:true});



let collection = {};

collection.getAllBranch = async() => {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/SareeFirmDB',{useNewUrlParser:true, useUnifiedTopology:true});
        let model = await mongoose.model("branch", branchSchema);
        return model;
    }catch(err){
        let error = new Error("could not connect to database");
        error.status = 500;
        throw error;
    }
};

collection.getProduct = async() => {
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/SareeFirmDB',{useNewUrlParser:true});
      let model = await mongoose.model("inventory", productSchema);
      return model;
    } catch (err) {
      let error = new Error("could not connect to database");
      error.status = 500;
      throw error;
    }
};

collection.getSales = async() => {
  try{
      await mongoose.connect('mongodb://127.0.0.1:27017/SareeFirmDB',{useNewUrlParser:true});
      let model = await mongoose.model("saless", salesSchema);
      return model;
  }catch(err){
      let error = new Error("could not connect to database");
      error.status = 500;
      throw error;
  }
};



module.exports = collection;
