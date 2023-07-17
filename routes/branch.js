var express = require('express');
var router = express.Router();
const controllerBranch = require('../controllers/branch');
const addNewBranch = require('../models/newBranch');
const bcrypt = require('bcrypt');


router.get('/', async(req, res, next) =>{
    try{
        let allBranch = await controllerBranch.getAllBranch();
        res.send(allBranch);
    }catch(error){
        next(error);
    }
});

router.post('/addNewBranch', async(req, res, next) =>{
    try {
        let hashcode = await bcrypt.hash(req.body.Password, 10);
        let newBranch = new addNewBranch(req.body, hashcode);
        await controllerBranch.addNewBranch(newBranch);
        res.status(201).json({"message":"Successfully added new Branch"});
    } catch (error) {
        next(error);
    }
})

router.put('/updateDetails/:branch_id', async(req, res, next) =>{
    try {
        await controllerBranch.updateDetails(req.body, req.params.branch_id);
        res.status(201).json({"message":"details updated succesfully"})
    } catch (error) {
        next(error);
    }
})

router.delete('/delete/:branch_id', async(req, res, next) =>{
    try {
        let branch_id = req.params.branch_id;
        await controllerBranch.deleteBranch(branch_id);
        res.status(201).json({"message":"succesfully removed branch ${branch_id}"}); 
    } catch (error) {
        next(error);
    }
})

module.exports = router;