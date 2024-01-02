const express = require('express');

const OrderController = require('../controller/OrderController');
const verifyToken=require('../middleware/AuthMiddleware')
const router = express.Router();

router.post('/create',OrderController.create);
router.get('/find-by-id/:id', OrderController.findById);
router.delete('/delete/:id',OrderController.deleteById);
router.put('/update/:id',OrderController.update);
router.get('/find-all',OrderController.findAll);
router.get('/find-all-count',OrderController.findAllCount);
router.get('/find-all-income',OrderController.findAllIncome);

module.exports = router