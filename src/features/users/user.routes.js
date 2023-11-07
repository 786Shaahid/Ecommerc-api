import express from "express";
import UserControllers from "./user.controllers.js";
const userControllers=new UserControllers();
const userRouters= express.Router();

userRouters.post('/signup',userControllers.signUp)
userRouters.post('/login',userControllers.signIn)





export default userRouters;


