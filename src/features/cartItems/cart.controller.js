import Cartmodels from "./cart.model.js"


export default class CartController{
   addItems(req,res){
      const {productID,quantity}=req.query;
      const userID=req.userID;
    const addToCart=  Cartmodels.add(productID,userID,quantity);
    return res.status(201).send("Cart is updated");
   }
   get(req,res){
    const userID=req.userID;
    const items=Cartmodels.get(userID);
     return res.status(200).send(items);
   }
   delete(req,res){
    const userID=req.userID;
    // console.log(req.params);
    const cartID=req.params.id;
    const error=Cartmodels.delete(userID,cartID);
    console.log(error);
    if(error){
        return res.status(404).send("cart not found")
    }else{
        return res.status(200).send('Cart is removed')
    }
   }
}