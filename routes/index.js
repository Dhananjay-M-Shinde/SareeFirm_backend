var express = require('express');
var router = express.Router();
const branchRouter = require('./branch');
const productRouter = require('./products');

router.use('/branch', branchRouter);

router.use('/products', productRouter);

module.exports = router;
