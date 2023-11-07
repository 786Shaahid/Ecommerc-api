import express from "express";
import CartController from "./cart.controller.js";
const cartRouter=express.Router();
const cartController=new CartController();

cartRouter.post('/',cartController.addItems);
cartRouter.get('/',cartController.get);
cartRouter.delete('/:id',cartController.delete);


export default cartRouter;
