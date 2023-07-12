

const connection = require('../utilities/connection');


let order = {};


order.updateInventoryQuantity = async(orderId) => {
  try {
    // Retrieve the order document
    const Order = await connection.getSales();
    const Product = await connection.getProduct();
    const order = await Order.findOne({ salesId: orderId });
    if (!order) {
      return console.log('Order not found');
    }

    // Iterate through the productCart array
    for (const product of order.productCart) {
      const { productId, branchId, productName, color, quantity, totalAmount } = product;

      // Find the variant in the inventory document
      const inventory = await Product.findOne({
        Product_Id: productId,
        Branch_Id: branchId,
        'Varients.Color': color,
      });

      if (inventory) {
        // Find the variant index in the Varients array
        const variantIndex = inventory.Varients.findIndex((variant) => variant.Color === color);

        if (variantIndex !== -1) {
          // Update the Quantity_Available for the variant
          inventory.Varients[variantIndex].Quantity_Available -= quantity;

          // Save the updated inventory document
          await inventory.save();
        }
      }
    }

    return "inventory updated succesfully"
    
  } catch (error) {
    let err = new Error("some error occur while updating inventory");
    err.status = 401;
    throw err;
  }
}

// // Usage: Pass the salesId or any other identifier for the order document
// updateInventoryQuantity('1');
module.exports = order;
