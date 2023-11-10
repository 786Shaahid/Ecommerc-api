import { getDB } from "../../config/mongodb.js";
import UserModels from "./user.models.js";

export default class UserRepository{
    async SignUp(newUser){
        // console.log(newUser);
        //1 get data from database
        const  db= getDB();
        // 2 create colletion for users
        const collection=db.collection("users");
        // insert user to database
        try{
            const user= await collection.insertOne(newUser);
             return     user;
        }catch(err){
            return new Error(err);
        }
        
     }
     
     async findByEmail(email){
        const db=getDB();
         const collection= await db.collection("users");
         const isUser= await collection.findOne({email});
         return isUser;
        }
}