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

product.addVarient = async(product_id, branch_id, varient) =>{
    let model = await connection.getProduct();

    const existingVariant = await model.findOne(
        { Branch_Id: branch_id, Product_Id: product_id, "Varients.Color": varient.Color },
        { Varients: { $elemMatch: { Color: varient.Color } } }
      );

      
    if(!existingVariant){
        let varients = await model.updateOne({Branch_Id:branch_id, Product_Id:product_id}, {
            $push: { Varients: varient }
          });

          if(varients){
            return true;
        }else{
            let err = new Error("some error occur while inserting new varient");
            err.status(401);
            throw err;
        }
    }else{
        let err = new Error("varient is already available for given product");
        err.status = 401;
        throw err;
    }

    
}

module.exports = product;