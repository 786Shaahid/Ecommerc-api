import express from "express";
import OrderController from "./order.controller.js";
import { ExplainVerbosity } from "mongodb";
const orderControllers=new OrderController();
const orderRouters= express.Router();

orderRouters.post("/",(req,res,next)=>{
    orderControllers.placeOrder(req,res,next);
});


export default orderRouters;