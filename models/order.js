const { model } = require('mongoose');
const connection = require('../utilities/connection');
const inventoryUpdated = require('../services/order');


let order = {};

order.processOrder = async(req, res, orderObj) =>{

    const { salesId, customerName, customerMobile, salesDate, productCart, totalAmount } = orderObj;

  try {
    const insufficientProducts = [];

    // Validate quantity for each product in the productCart
    for (const product of productCart) {
      const { productId, productName, branchId, color, quantity, totalAmounts } = product;
      
      // Retrieve the inventory document for the specified product and branch
      let model = await connection.getProduct();

      const quant_available = await model.aggregate([
        {
          $match: {
            Branch_Id: branchId,
            Product_Id: productId,
            "Varients.Color": color
          }
        },
        {
          $project: {
            _id: 0,
            Quantity_Available: {
              $filter: {
                input: "$Varients",
                as: "variant",
                cond: { $eq: ["$$variant.Color", color] }
              }
            }
          }
        },
        {
          $unwind: "$Quantity_Available"
        },
        {
          $project: {
            Quantity_Available: "$Quantity_Available.Quantity_Available"
          }
        }
      ]).exec();

      console.log(quant_available);

      if(quant_available.length === 0){
        console.log("product not found with color ", color);
        res.status(400).json({message:`Product not found with color ${color}`});
        return;
    }
      
      const [{Quantity_Available}] = quant_available;

      if (Quantity_Available < quantity) {
        console.log("not available");
        insufficientProducts.push({ productId, branchId, color});
      }
    }
    console.log("insufficient quantity ",insufficientProducts);

    // If any products have insufficient quantity, return an error response
    if (insufficientProducts.length > 0) {
      console.log('Insufficient quantity for some products', insufficientProducts);
      res.status(400).json({ message: 'Insufficient quantity for some products', insufficientProducts });
      return;
    }

    // Process the order, update inventory, and perform other necessary operations
    // ...
    let processOrderModel = await connection.getSales();
    let order = await processOrderModel.insertMany(orderObj);
    let updated = await inventoryUpdated.updateInventoryQuantity(salesId); 
    if(updated){
        return true;
    }
  } catch (error) {
    let err = new Error(error.message);
    err.status = 401;
    throw err;
  }
}

module.exports = order;