const modelSales = require('../models/sales');

let sale = {};

sale.salesByBranch = async(branch_id) =>{
    console.log("into cotro1");
    let sales = modelSales.salesByBranch(branch_id);
    console.log("into cotro2");
    if(sales){
        return sales;
    }else{
        let err = new Error("some error occur while fetching sales by branchId");
        err.status = 401;
        throw err;
    }
}

sale.salesByProductId = async(product_id) =>{
    let sales = modelSales.salesByProductId(product_id);
    if(sales){
        return sales;
    }else{
        let err = new Error("some error occur while fetching sales by productId");
        err.status = 401;
        throw err;
    }
}

sale.salesByBranch_ProductId = async(branch_id, product_id) =>{
    let sales = modelSales.salesByBranch_ProductId(branch_id, product_id);
    if(sales){
        return sales;
    }else{
        let err = new Error("some error occur while fetching sales by productId and branchId");
        err.status = 401;
        throw err;
    }
}

module.exports = sale;