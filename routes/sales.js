var express = require('express');
var router = express.Router();

const controllerSales = require('../controllers/sales');

router.get('/salesByBranchId/:branch_id', async(req, res, next) =>{
    try {
        let sales = await controllerSales.salesByBranch(req.params.branch_id);
        let [result] = sales;
        let {_id, totalSales, count} = result;
        console.log(totalSales);
        res.send(sales)
    } catch (error) {
        next(error);
    }
});

router.get('/salesByProductId/:product_id', async(req, res, next) =>{
    try {
        let sales = await controllerSales.salesByProductId(req.params.product_id);
        let [result] = sales;
        let {_id, totalSales, totalQuantitySaled, count} = result;
        console.log(totalSales);
        res.send(sales)
    } catch (error) {
        next(error);
    }
});

module.exports = router;