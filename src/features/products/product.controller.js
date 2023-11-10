import { getDB } from "../../config/mongodb.js";
import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";
export default class ProductController{
  constructor(){
    this.productRepository= new ProductRepository();
  }
  // 1. without db
      // getAll(req,res){
      //   const products=ProductModel.getProducts();
      //   return res.status(200).send(products);  
      // }
   // 1. with db
      async  getAll(req,res){
        try{
          const product=await this.productRepository.getAll();
          return res.status(200).send(product);
        }catch(err){
          console.log(err);
          return res.status(404).send('Something went wronge')
        }
        }
        //2. without db
      // getOneProduct(req,res){
      //    const product=ProductModel.get(req.params.id);
      //    return res.status(200).send(product);
      // }
      // 2. with db
   async   getOneProduct(req,res){
          const id=req.params.id;
          const product= await this.productRepository.getOneProduct(id);
          if(!product){
            return res.status(400).send("Product is not found")
          }else{
            return res.status(200).send(product);
          }
      }
      // 3. without db
      // addProduct(req,res){
      // const {name,description,price,sizes}=req.body;
      //   // console.log(sizes);
      //  const product={
      //       name:name,
      //       description:description,
      //       price:parseFloat(price),
      //       sizes:sizes.split(','),
      //       image:req.file.filename
      //  }
      //  const AddProduct=  ProductModel.addProductDetails(product);
      //  return res.status(201).send(AddProduct);
      // }    
      // 3. with db                                                                           
    async   addProduct(req,res){
      const {name,description,price,sizes}=req.body;
        // console.log(sizes);
       const product={
            name:name,
            description:description,
            price:parseFloat(price),
            sizes:sizes.split(','),
            image:req.file.filename
       }
       console.log(product);
       try{
         const AddProduct=  await this.productRepository.add(product);
         return res.status(201).send(AddProduct);
       }catch(err){
          console.log(err);
          return res.status(400).send("Something Went Wronge: 500")  
       }
      }                                                                               
      //. wihtout db
      // filterProducts(req,res){
      //   const minPrice=req.query.minPrice;
      //   const maxPrice=req.query.maxPrice;
      //   const category=req.query.category; 
      // const filteredProduct=  ProductModel.filter(minPrice,maxPrice,category);
      // return res.status(200).send(filteredProduct);
      // } 
      // 3. with db 
   async filterProducts(req,res){
        try{
          const minPrice=req.query.minPrice;
          const maxPrice=req.query.maxPrice;
          const category=req.query.category;
       const filterProducts=   await this.productRepository.filter(minPrice,maxPrice,category);
         return res.status(200).send(filterProducts);  
      }catch(err){
          console.log(err);
          return res.status(404).send("Something Went Wronge");
        }
       }
// without db
  //  rateProducts(req,res){
  //   const userID=req.query.userID;
  //   const productID=req.query.productID;
  //   const rating=req.query.rating;
  //   const error=ProductModel.rating(userID,productID,rating);
  //   if(error){
  // return res.status(400).send(error);
  //   }else{
  //     return res.status(200).send("Rating has been added");
  //   }
  //  }
  // with db

 async  rateProducts(req,res){
         try{
           const userID=req.userID;
           const productID=req.query.productID;
           const rating=req.query.rating;
           const error=await this.productRepository.rating(userID,productID,rating);
           if(error){
               return res.status(400).send(error);
           }else{
               return res.status(200).send("Rating has been added");
           }
         }catch(err){
             console.log(err);
             return res.status(400).send("Somthing went wronge");
         }
   }
   async averagePrice(req,res){
    try{
    const result=  await this.productRepository.averagePricePerCategory();
     return res.status(200).send(result);
    }catch(err){
      console.log(err);
      return res.status(400).send('Something Went Wronge')
    }
         
   }


}