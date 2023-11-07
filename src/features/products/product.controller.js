import ProductModel from "./product.model.js";

export default class ProductController{
      getAll(req,res){
        const products=ProductModel.getProducts();
        return res.status(200).send(products);  
      }
      getOneProduct(req,res){
         const product=ProductModel.get(req.params.id);
         return res.status(200).send(product);
      }
      addProduct(req,res){
      const {name,description,price,sizes}=req.body;
        // console.log(sizes);
       const product={
            name:name,
            description:description,
            price:parseFloat(price),
            sizes:sizes.split(','),
            image:req.file.filename
       }
       const AddProduct=  ProductModel.addProductDetails(product);
       return res.status(201).send(AddProduct);
      }                                                                               

      filterProducts(req,res){
        const minPrice=req.query.minPrice;
        const maxPrice=req.query.maxPrice;
        const category=req.query.category; 
      const filteredProduct=  ProductModel.filter(minPrice,maxPrice,category);
      return res.status(200).send(filteredProduct);
      } 

   rateProducts(req,res){
    const userID=req.query.userID;
    const productID=req.query.productID;
    const rating=req.query.rating;
    const error=ProductModel.rating(userID,productID,rating);
    if(error){
  return res.status(400).send(error);
    }else{
      return res.status(200).send("Rating has been added");
    }

   }



}