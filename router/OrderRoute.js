const express = require('express');

const OrderController = require('../controller/OrderController');
const verifyToken=require('../middleware/AuthMiddleware')
const router = express.Router();

router.post('/create',verifyToken,OrderController.create);
router.get('/find-by-id/:id',verifyToken, OrderController.findById);
router.delete('/delete/:id',verifyToken,OrderController.deleteById);
router.put('/update/:id',verifyToken,OrderController.update);
router.get('/find-all',verifyToken,OrderController.findAll);
router.get('/find-all-count',verifyToken,OrderController.findAllCount);
router.get('/find-all-income',verifyToken,OrderController.findAllIncome);

module.exports = router