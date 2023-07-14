const connection = require('../utilities/connection');

let sale = {};

sale.salesByBranch = async(branch_id) =>{
    var branchId = Number(branch_id);
    console.log("into model1");
    let model = await connection.getSales();
    console.log("into model2");

    let sales_by_branch = await model.aggregate([
        {
          $unwind: "$productCart"
        },
        {
          $match: {"productCart.branchId": branchId}
        },
        {
          $group: {
            _id: "$productCart.branchId",
            totalSales: { $sum: "$productCart.totalAmount" },
            totalQuantitySaled:{$sum: "$productCart.quantity"},
            totalOrders: { $sum: 1 }
          }
        }
      ]);
    if(sales_by_branch){
        return sales_by_branch;
    }else{
        let err = new Error("some error occur while fetching sale by Branch_id");
        err.status = 401;
        throw err;
    }
}

sale.salesByProductId = async(product_id) =>{
    var productId = Number(product_id);
    let model = await connection.getSales();
    let sales_by_product = await model.aggregate([
        {
          $unwind: "$productCart"
        },
        {
          $match: {"productCart.productId": productId}
        },
        {
          $group: {
            _id: "$productCart.productId",
            totalSales: { $sum: "$productCart.totalAmount" },
            totalQuantitySaled:{$sum: "$productCart.quantity"},
            totalOrders: { $sum: 1 }
          }
        }
      ]);
    if(sales_by_product){
        return sales_by_product;
    }else{
        let err = new Error("some error occur while fetching sale by Branch_id");
        err.status = 401;
        throw err;
    }
}

sale.salesByBranch_ProductId = async(branchId, productId) =>{
  let branch_id = Number(branchId);
  let product_id = Number(productId);
  let model = await connection.getSales();
  let sales = await model.aggregate([
    {
      $unwind: "$productCart"
    },
    {
      $match: {
        "productCart.productId": product_id,
        "productCart.branchId": branch_id
      }
    },
    {
      $group: {
        _id: {
          productId: "$productCart.productId",
          branchId: "$productCart.branchId",
          color: "$productCart.color"
        },
        totalSales: { $sum: "$productCart.totalAmount" },
        TotalQuantitySaled: { $sum: "$productCart.quantity" },
        TotalOrders: { $sum: 1 }
      }
    }
  ]).exec();
  console.log(sales);
  if(sales){
    return sales;
}else{
    let err = new Error("some error occur while fetching sale by Product_id and Branch_id");
    err.status = 401;
    throw err;
}
}



module.exports = sale;