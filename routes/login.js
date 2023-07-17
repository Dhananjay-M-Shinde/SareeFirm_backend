var express = require('express');
var router = express.Router();
const controllerLogin = require('../controllers/login');
const { route } = require('./auth');

router.post('/', async(req, res, next) =>{
    try {
        let user = await controllerLogin.userLogin(req, res, req.body);
        
    } catch (error) {
        next(error);
    }
})

module.exports = router;