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

product.addNewProduct = async(productObj) =>{
    let model = await connection.getProduct();
    let product = await model.insertMany(productObj);
    
    if(product){
        return true;
    }else{
        let err = new Error('some error occur while inserting product');
        err.status = 401;
        throw err
    }
}

product.updateProduct = async(branch_id, product_id, color, data) =>{
    let model = await connection.getProduct();
    let product = await model.updateOne({Branch_Id:branch_id, Product_Id:product_id, "Varients.Color":color}, {
        $set: { "Varients.$.Price": data.price},
        $inc: { "Varients.$.Quantity_Available": data.quantity}
      });

      if(product){
        return true;
      }else{
        let err =  new Error("some error occue while updating product data");
        err.status = 401;
        throw err;
      }
}

module.exports = product;