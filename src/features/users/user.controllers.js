import UserModels from "./user.models.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import bcrypt from 'bcrypt';
export default class UserControllers{
  constructor(){
   this.userRepository=new UserRepository();
  }

   async  signUp(req,res){
      // console.log(req.body);
        const {name,email,password,type}=req.body;
        const hashPassword=await bcrypt.hash(password,12);
        const user=new UserModels(
         name,
         email,
         hashPassword,
         type
        );
        try{
         const userSignup=  await this.userRepository.SignUp(user);
           return res.status(201).send(userSignup);
        }catch(err){
         // console.log(err);
         return new Error(err);
        }

     };
     
   async  signIn(req,res){
      console.log(req.body.email);
        const {email,password}=req.body;
        try{
           const user=await this.userRepository.findByEmail(email);
           console.log(user);
            if(!user){
               return res.status(400).send('Invaild Credentail !');
            }else{
               // compare password using bcrypt
             const result=  await bcrypt.compare(password,user.password);
            //  console.log(result);
              if(result){
                 const token=jwt.sign(
                   {
                      userID:user._id,
                      email:user.email
                 },
                 process.env.TOKEN_SECRETKEY,
                 {
                   expiresIn:'1h'
                 }
                 );
                 // sending the token
                return res.status(200).send(token);
             }else{
               return res.status(404).send("Invalid Credentials");
             }

              } 
        }catch(err){
           console.log(err);
           return res.status(404).send("Something Went Wronge")
        }
   
     }
    
}