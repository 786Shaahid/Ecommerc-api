import OrderRepository from "./order.repository.js";

export default class OrderController{
    constructor(){
        this.orderRepository=new OrderRepository();
    }

     async placeOrder(req,res,next){
       try{
           await this.orderRepository.placeOrder(req.userID);
           return res.status(200).send("Order is created");
       }catch(err){
        console.log(err);
        return res.status(400).send("something went wronge")
       }
     }
    
}