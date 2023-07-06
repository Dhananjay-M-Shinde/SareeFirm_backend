var express = require('express');
var router = express.Router();
const branchRouter = require('./branch');

/* GET home page. */
router.use('/branch', branchRouter);

module.exports = router;
