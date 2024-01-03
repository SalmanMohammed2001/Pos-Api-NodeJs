const express = require('express');

const ProductController = require('../controller/ProductController');
const verifyToken=require('../middleware/AuthMiddleware')
const router = express.Router();

const multer  = require('multer')
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./image')
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}_${file.originalname}`)
    }
})
const upload = multer({storage: storage})





router.post('/create',verifyToken,upload.single('image'),ProductController.create);
router.get('/find-by-id/:id',verifyToken,ProductController.findById);
router.delete('/delete-by-id/:id',verifyToken,ProductController.deleteById);
router.put('/update/:id',verifyToken,upload.single('image'),ProductController.update);
router.get('/find-all',verifyToken,ProductController.findAll);
router.get('/find-all-min',verifyToken,ProductController.findAllMin);
router.get('/find-all-count',verifyToken,ProductController.findAllCount);


module.exports = router