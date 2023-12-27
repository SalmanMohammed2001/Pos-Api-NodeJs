const express = require('express');

const OrderController = require('../controller/OrderController');
const verifyToken=require('../middleware/AuthMiddleware')
const router = express.Router();

router.post('/create',OrderController.create);
router.get('/find-by-id/:id',verifyToken, OrderController.findById);
router.delete('/delete-by-id',verifyToken,OrderController.deleteById);
router.put('/update',verifyToken,OrderController.update);
router.get('/find-all',verifyToken,OrderController.findAll);


module.exports = router