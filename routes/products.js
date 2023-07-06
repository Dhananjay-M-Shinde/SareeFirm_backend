var express = require('express');
var router = express.Router();
const controllerProduct = require('../controllers/products');

router.get('/:branch_id', async(req, res, next) =>{
    try {
        let products = await controllerProduct.getAllProducts(req.params.branch_id);
        res.send(products)
    } catch (error) {
        next(error);
    }
})

module.exports = router;