const express=require('express')
const router=express.Router()
const CustomerController=require('../controller/CustomerController')
const verifyToken=require('../middleware/AuthMiddleWare')

router.post('/create',verifyToken,CustomerController.create);
router.get('/find-by-id/:id', CustomerController.findById);
router.delete('/delete/:nic',verifyToken,CustomerController.deleteById);
router.put('/update',verifyToken,CustomerController.update);
router.get('/find-all',verifyToken,CustomerController.findAll);



module.exports=router