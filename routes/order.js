var express = require('express');
var router = express.Router();
const controllerOrder = require('../controllers/order');
const newProduct = require('../models/order');
const order = require('../models/newSales');

router.post('/orderPlaced', async(req, res, next) =>{
    try {
        let orderObj = new order(req.body);
        await controllerOrder.processOrder( req, res, orderObj);
        
        res.status(201).json({"message":"order process succesfully"});
        
        
    } catch (error) {
        next(error);
    }

})

module.exports = router;