import express from 'express';
import ProductController from './product.controller.js';
import upload from '../../middlewares/fileUpload.middleware.js';
let productRouter=express.Router();
const productController= new ProductController();
productRouter.post('/rating',productController.rateProducts)
productRouter.get('/filter',productController.filterProducts);
productRouter.get('/',productController.getAll);
productRouter.get('/:id',productController.getOneProduct);
productRouter.post('/',upload.single("image"),productController.addProduct);
export default productRouter;