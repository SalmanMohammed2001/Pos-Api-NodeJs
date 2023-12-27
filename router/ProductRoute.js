const express = require('express');

const ProductController = require('../controller/ProductController');
const verifyToken=require('../middleware/AuthMiddleware')
const router = express.Router();

router.post('/create',ProductController.create);
router.get('/find-by-id/:id',ProductController.findById);
router.delete('/delete-by-id',ProductController.deleteById);
router.put('/update/:id',ProductController.update);
router.get('/find-all',verifyToken,ProductController.findAll);


module.exports = router