const connection = require('../utilities/connection');

let product = {};

product.getAllProducts = async(branch_id) =>{
    let model = await connection.getProduct();
    let products = await model.find({Branch_Id:branch_id}, {_id:0});

    if(products){
        return products;
    }else{
        let err = new Error("couldn't fetch products");
        err.status = 401;
        throw err;
    }
}

module.exports = product;