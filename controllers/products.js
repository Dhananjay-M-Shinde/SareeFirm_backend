const { model } = require('mongoose');
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

product.addNewProduct = async(productObbj) =>{
    let product = await modelProduct.addNewProduct(productObbj);

    if(product){
        return true;
    }else{
        let err = new Error("some error occur while inserting new product");
        err.status = 401;
        throw err;
    }
}

product.updateProduct = async(branch_id, product_id, color, data) =>{
    let product = await modelProduct.updateProduct(branch_id, product_id, color, data);

    if(product){
        return true;
    }else{
        let err = new Error("some error occur while updating product");
        err.status = 401;
        throw err;
    }
}

product.addVarient = async(product_id, branch_id, varient) =>{
    let varients = await modelProduct.addVarient(product_id, branch_id, varient);

    if(varients){
        return true;
    }else{
        let err = new Error("some error occur while adding new varient");
        err.status = 401;
        throw err;
    }
}

module.exports = product;