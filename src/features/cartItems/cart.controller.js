import Cartmodels from "./cart.model.js"
import CartRepository from "./cart.repository.js";


export default class CartController{
  constructor(){
    this.cartRepository=new CartRepository();
  }
  // 1. without db
  //  addItems(req,res){
  //     const {productID,quantity}=req.query;
  //     const userID=req.userID;
  //   const error=  Cartmodels.add(productID,userID,quantity);
  //   if(error){
  //     console.log(error);
  //   }

 async   addItems(req,res){
  try{
    const {productID,quantity}=req.query;
    const userID=req.userID;
   await this.cartRepository.add(productID,userID,quantity);
   return res.status(201).send("Cart is updated");
     }catch(err){
       console.log(err);
       return res.status(400).send("Something went wronge");
  }
   }
   // 2. without db
  //  get(req,res){
  //   const userID=req.userID;
  //   const items=Cartmodels.get(userID);
  //    return res.status(200).send(items);
  //  }
// with db
async  get(req,res){
  try{
    const userID=req.userID;
    // console.log("get f",userID);
    const items=await this.cartRepository.get(userID);
     return res.status(200).send(items);
  }catch(err){
    console.log(err);
    return res.status(400).send("Something went wronge")
  }
} 
// without db
  //  delete(req,res){
  //   const userID=req.userID;
  //   // console.log(req.params);
  //   const cartID=req.params.id;
  //   const error=Cartmodels.delete(userID,cartID);
  //   console.log(error);
  //   if(error){
  //       return res.status(404).send("cart not found")
  //   }else{
  //       return res.status(200).send('Cart is removed')
  //   }
  //  }

async  delete(req,res){
  try{
    const userID=req.userID;
    // console.log(req.params);
    const cartID=req.params.id;
    await this.cartRepository.delete(userID,cartID);
    return res.status(200).send('Cart is removed');
  }catch(err){
    console.log(err);
    return res.status(404).send("Cart not found")
  }
   }
}