import { ObjectId } from "mongodb";
import {  getDB } from "../../config/mongodb.js";

export default class CartRepository{
    constructor(){
        this.collection="cartItems"
    }
    async add(productID,userID,quantity){
        try{
         const db= getDB();
         const collection=db.collection(this.collection);
         const id=await this.getNextCount(db);
         //  await collection.insertOne({productID,userID,quantity});
// findthe document
// insert or update //  $inc->increment field // upsert->true - insert using updateone
// insertion
        await collection.updateOne(
            {productID:new ObjectId(productID),userID:new ObjectId(userID)},
            {   
                $setOnInsert:{_id:id},
                $inc:{
                quantity:parseFloat(quantity)
            }},
            {upsert:true});
        }catch(err){
            console.log(err);
        }
    }

    async get(id){
            try{
                const db= getDB();
                const collection=db.collection(this.collection);
             const item=  await collection.find({userID:new ObjectId(id)}).toArray() ;
            //  console.log(id,item);
          return item;
            }catch(err){
             console.log(err);
            }
    }

    async delete(userID,cartID){
         try{
            const db= getDB();
            const collection=db.collection(this.collection);
           const result= await collection.deleteOne({_id:new ObjectId(cartID),userID:new ObjectId(userID)});
           return result.deletedCount>0;
         }catch(err){
            console.log(err);
         }   
    }
    async getNextCount(db){
        const resultDoc= await db.collection("counters").findOneAndUpdate(
            {_id:"cartItemID"},
            {$inc:{value:1}},
            {returnDocument:"after"}
        )
        console.log(resultDoc);
        return resultDoc.value;
    }
}