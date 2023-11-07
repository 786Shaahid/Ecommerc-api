// import express 
import express from 'express';
import  swagger  from 'swagger-ui-express';

import productRouter from './src/features/products/product.router.js';
import uploads from './src/middlewares/fileUpload.middleware.js';
import userRouters from './src/features/users/user.routes.js';
// import basicAuthorize from './src/middlewares/basicAuthentication.middleware.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import cartRouter from './src/features/cartItems/cart.router.js';
import apiDocs from './swagger.json' assert {type:"json"};
const port=3000;
// create app 
const app=express();
app.use(express.json());

// app.use('/api/products',basicAuthorize,productRouter);
app.use("/api-docs",swagger.serve,swagger.setup(apiDocs))
app.use('/api/cartitems',jwtAuth,cartRouter);
app.use('/api/products',jwtAuth,productRouter);
app.use('/api/users',userRouters);

// default routes
app.get('/',(req,res)=>{
    res.status(200).send('hellow this is shahid')
});

// middleware for handle 400 request

app.use((req,res)=>{
    return res.status(400).send('Api not found !');
})






// listening the aap
app.listen(port,(err)=>{
    if(err){
        console.log(`Server is not connecting ${port} `);
    }
    console.log(`Server is connected Successfully on port :${port}`);
})
