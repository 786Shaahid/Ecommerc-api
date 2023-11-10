import express from "express";
import UserControllers from "./user.controllers.js";
const userControllers=new UserControllers();
const userRouters= express.Router();

userRouters.post('/signup',(req,res)=>{
    userControllers.signUp(req,res)
})
userRouters.post('/login',(req,res)=>{
    userControllers.signIn(req,res);
})





export default userRouters;


