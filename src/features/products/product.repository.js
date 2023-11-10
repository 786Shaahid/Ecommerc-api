import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";

class ProductRepository{
    constructor(){
        this.collection="products";
    }
    async  getAll(){
        try{
            //1. get DB
            const db=getDB();
            //2. create collection
            const collection=db.collection(this.collection);
         const products=  await  collection.find().toArray();
          return products;
        }catch(err){
        console.log(err);
        return res.status(400).send("Something went wrong");
        }
      }

      async getOneProduct(id){
        try{
            const db=getDB();
            const collection= db.collection(this.collection);
          const product=  await collection.findOne({_id:new ObjectId(id)});
          return product;
        }catch(err){
            console.log(err);
            return res.status(400).send("Something Went Wronge")
        }
          
      }
      async add(newProduct){
          const db=getDB();
          const collection=db.collection(this.collection);
          try{
                 const product= await collection.insertOne(newProduct);
                 return product;
          }catch(err){
            console.log("Somthing Went Wronge : 500",err);
          }
      }

      async filter(minPrice,maxPrice,category){
        try{
          const db=getDB();
          const collection=db.collection(this.collection);
           const filterEpression={};
           if(minPrice){
            filterEpression.price={...filterEpression.price,$gte:parseFloat(minPrice)};
           }
           if(maxPrice){
            filterEpression.price={...filterEpression.price,$lte:parseFloat(maxPrice)};
           }
           if(category){
            filterEpression.category=category;
           } 
         const filterProduct= await collection.find(filterEpression).toArray();
            return filterProduct;
        }catch(err){
          console.log(err);
        }
      }
    // async  rating(userID,productID,rating){
    //        try{
    //         const db=getDB();
    //         const collection=db.collection(this.collection);
    //         // 1. find the products
    //         const product= await collection.findOne({_id:productID}); 
    //         // 2. find rating
    //       const userRating=  product?.ratings?.find((r)=>r.userID=userID);
    //          if(userRating){
    //               //3. update rating
    //               await collection.updateOne({
    //                 _id:new ObjectId(productID),"ratings  .userID":new ObjectId(userID)
    //               },{
    //                   $set:{
    //                     "ratings.$.rating":rating
    //                   }
    //               })
    //          }else{

    //            await collection.updateOne({_id:new ObjectId(productID)},
    //            {$push:{ratings:{userID:new ObjectId(userID),rating}}});
    //          }

    //        }catch(err){
    //         console.log(err);

    //        }
    //           }

    async  rating(userID,productID,rating){
      try{
       const db=getDB();
       const collection=db.collection(this.collection);
        // 1. Remove existing entry
        await collection.updateOne({_id: new ObjectId(productID)},{
          $pull:{ratings:{userID:new ObjectId(userID)}}
        })   
       // 2. Add new entry
          await collection.updateOne({_id:new ObjectId(productID)},
          {$push:{ratings:{userID:new ObjectId(userID),"rating":rating}}});

      }catch(err){
       console.log(err);
      }
         }
      async averagePricePerCategory(){
        try{
          const db=getDB();
          await db.collection(this.collection).aggregate([{
            $group:{_id:"$category",
           averagePrice: {$avg:"$price"}
          }}]).toArray();   
        }catch(err){
          console.log(err);
        }
      }      
         
}
export default ProductRepository;