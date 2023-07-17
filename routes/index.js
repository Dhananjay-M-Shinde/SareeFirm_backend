var express = require('express');
var router = express.Router();
const branchRouter = require('./branch');
const productRouter = require('./products');
const orderRouter = require('./order');
const salesRouter = require('./sales');
const loginRouter = require('./login');

router.use('/branch', branchRouter);

router.use('/products', productRouter);

router.use('/order', orderRouter);

router.use('/sales', salesRouter);

router.use('/api/login', loginRouter);

module.exports = router;
