var express = require('express');
var router = express.Router();
const controllerProduct = require('../controllers/products');
const newProduct = require('../models/newProduct');

router.get('/:branch_id', async(req, res, next) =>{
    try {
        let products = await controllerProduct.getAllProducts(req.params.branch_id);
        res.send(products)
    } catch (error) {
        next(error);
    }
});

router.post('/newProduct', async(req, res, next) =>{
    try {
        let productObj = new newProduct(req.body);
        await controllerProduct.addNewProduct(req.body);
        res.status(201).json({"message":"product added succesfully"});
    } catch (error) {
        
    }
});

router.put('/updateProduct/:branch_id/:product_id/:color', async(req, res, next) =>{
    try {
        let branch_id = req.params.branch_id;
        let product_id = req.params.product_id;
        let color = req.params.color;
        let product = await controllerProduct.updateProduct(branch_id, product_id, color, req.body);
    res.status(201).json({"message":"product details updated succesfully"});
    } catch (error) {
        next(error);
    }
    
})

module.exports = router;