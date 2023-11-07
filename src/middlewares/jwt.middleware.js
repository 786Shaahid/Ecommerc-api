import jwt from "jsonwebtoken";

const jwtAuth=(req,res,next)=>{
    // 1.read the token
      const token=req.headers['authorization'];
      console.log(token);
      // 2. if no token return err
      if(!token){
         return res.status(401).send('Unauthorized user')
      }
      // 3. check if token is valid
      
     try {
        const payload=jwt.verify(token,"xekSACHmbLxiiY1k5IKALU76btpBvaXV");
        req.userID=payload.userID;
     } catch (error) {
        // return error 
        console.log(error);
    return res.status(401).send("Unauthorized user");
}
// call next middleware
next();
}
export default jwtAuth;