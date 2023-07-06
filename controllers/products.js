const modelProduct = require('../models/products');

let product = {};

product.getAllProducts = async(branch_id) =>{
    let products = await modelProduct.getAllProducts(branch_id);
    if(products){
        return products;
    }else{
        let err = new Error("some error occur while fetching products");
        err.status = 401;
        throw err;
    }
}

module.exports = product;