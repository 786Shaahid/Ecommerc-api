import UserModels from "./user.models.js";
import jwt from "jsonwebtoken";
export default class UserControllers{
     signUp(req,res){
         const user=UserModels.SignUp(req.body);
         return res.status(201).send(user);
     }
     signIn(req,res){
        const {email,password}=req.body;
        const user=UserModels.SignIn(email,password);
         if(!user){
            return res.status(400).send('Invaild Credentail !');
         }else{
             const token=jwt.sign(
               {
                  userID:user.id,
                  email:user.email
             },
             "xekSACHmbLxiiY1k5IKALU76btpBvaXV",
             {
               expiresIn:'1h'
             }
             );
            return res.status(200).send(token);
         }
   
     }
    
}