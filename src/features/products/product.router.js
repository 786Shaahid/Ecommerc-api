import express from 'express';
import ProductController from './product.controller.js';
import upload from '../../middlewares/fileUpload.middleware.js';
let productRouter=express.Router();
const productController= new ProductController();
productRouter.post('/rating',(req,res)=>{
    productController.rateProducts(req,res);
})
productRouter.get('/filter',(req,res)=>{
    productController.filterProducts(req,res);
});
productRouter.get('/',(req,res)=>{
    productController.getAll(req,res);
});
productRouter.get('/avgprice',(req,res)=>{
    productController.averagePrice(req,res);
})
productRouter.get('/:id',(req,res,next)=>{
    productController.getOneProduct(req,res,next);
});
productRouter.post('/',upload.single("image"),(req,res)=>{
    productController.addProduct(req,res);
});
export default productRouter;