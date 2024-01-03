const express=require('express')
const router=express.Router()
const CustomerController=require('../controller/CustomerController')
const verifyToken=require('../middleware/AuthMiddleWare')

 router.post('/create',verifyToken,CustomerController.create);
// router.post('/create',CustomerController.create);
router.get('/find-by-id/:id', verifyToken,CustomerController.findById);
 router.delete('/delete/:id',verifyToken,CustomerController.deleteById);
//router.delete('/delete-by-id',CustomerController.deleteById);
 router.put('/update/:id',verifyToken,CustomerController.update);
//router.put('/update/:id',CustomerController.update);
 router.get('/find-all',verifyToken,CustomerController.findAll);
//router.get('/find-all',CustomerController.findAll);
router.get('/find-all-count',verifyToken,CustomerController.findAllCount);




module.exports=router