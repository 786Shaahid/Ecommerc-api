
import { MongoClient } from "mongodb";

 let clients;
export const connectToDB=async()=>{
     await  MongoClient.connect(process.env.DB_URL)
       .then(clientIntence=>{
          clients=clientIntence
          createCounter(clients.db());
        console.log("Connected to MongoDB")
    })
       .catch(err=>{console.log(err)});
}
export const getDB=()=>{
    return clients.db();
}
export const getClient=()=>{
   return clients;
}
// for creating custom id(without universal id that is created by mongodb)
  const createCounter=async(db)=>{
     const existingCounter=await db.collection("counters").findOne({_id:"cartItemID"});
     if(!existingCounter){
    await  db.collection('counters').insertOne({_id:"cartItemID",value:0})
     }
  }