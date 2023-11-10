import { MongoCryptAzureKMSRequestError, ObjectId } from "mongodb";
import { getClient,getDB } from "../../config/mongodb.js";
import OrderModel from "./order.model.js";

export default class OrderRepository{
    constructor(){
        this.collection="orders"
    }
async placeOrder(userID){
    const session=getClient().startSession();
    try{
        const db=getDB();
        session.startTransaction();
        //1 . get cart item and find total amount
        const items=  await this.getAmount(userID,session);
        const totalAmt=items.reduce((acc,items)=>acc+items.totalAmount,0);
        console.log(totalAmt);

        //2. create an order
        const newOrder= new OrderModel(userID,totalAmt,new Date());
         await db.collection('orders').insertOne(newOrder,{session});
        
         // 3. reduce the stock
         for( let item of items){
               await db.collection("products").updateOne(
                {
                    _id:items.productID
                },
                {
                    $inc:{stock:-item.quantity}
                },{session}
               ) 
            }
         // 4. clear cartItems
          db.collection('cartItems').deleteMany({
            _id:new ObjectId(user)
          },{session})
         //
         session.commitTransaction();
         session.endSession()
return;
    }catch(err){
        await session.abortTransaction();
        session.endSession();
        console.log(err);
    }


}
async getAmount(userID,session){
        const db=getDB();
    const items=    await db.collection("cartItems").aggregate([
              // 1.find product
              {
                 $match:{_id:new ObjectId(userID)}
              },
              //2. get product from product collection
              {
                $lookup:{
                    from:"products",
                    localField:"productID",
                    foreignField:"_id",
                    as:"productInfo"
                }  
              },
              // 3. unwind the productinfo
              {
                $unwind:"productInfo"
              },
              // calculate total amount of product
              {
                $addFields:{
                    "totalAmount":{
                        $multipy:["$productInfo.price","$quantity"]
                    }
                }
              }
        ],{session}).toArray();
        return items;
        
}
}