const modelOrder = require('../models/order');
const { route } = require('../routes');

let order = {};

order.processOrder = async(req, res, orderObj) =>{
    let ordertaken = await modelOrder.processOrder(req, res, orderObj);
    if(ordertaken){
        return true;
    }else{
        let err = new Error("some error occur while processing order");
        err.status = 401;
        throw err;
    }
}

module.exports = order;