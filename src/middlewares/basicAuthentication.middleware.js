import UserModels from "../features/users/user.models.js"
const basicAuthorize=(req,res,next)=>{
     // 1. check if authorization is empty
     const authHeader=req.headers['authorization'];
     if(!authHeader) {
        return res.status(401).send('No authorization details found')
     }
// 2. extract credentials [Basic ksdlgfjkfgfg]
  const basic64Credentials=authHeader.replace('Basic','');
   console.log(basic64Credentials);
  //3. decode the credentials
 
const decodeCreds=Buffer.from(basic64Credentials,'base64').toString("utf8");
console.log(decodeCreds); // [username:password]
    const cred=decodeCreds.split(':'); 
    const user=UserModels.getAll().find(u=> u.email=cred[0] && u.password==cred[1]);
    if(!user){
     return res.status(401).send('No authorization details found')
    }else{
        next();
    }
}

export default basicAuthorize;