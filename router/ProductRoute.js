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





router.post('/create',upload.single('image'),ProductController.create);
router.get('/find-by-id/:id',ProductController.findById);
router.delete('/delete-by-id/:id',ProductController.deleteById);
router.put('/update/:id',upload.single('image'),ProductController.update);
router.get('/find-all',ProductController.findAll);
router.get('/find-all-min',ProductController.findAllMin);


module.exports = router