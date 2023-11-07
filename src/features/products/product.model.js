import UserModels from "../users/user.models.js";

class ProductModel{
       constructor(id,name,description,price,image,cateogory,size){
        this.id=id,
        this.name=name,
        this.description=description,
        this.price=price,
        this.image=image,
        this.cateogory=cateogory,
        this.size=size
       }
    static getProducts(){
          return products;
    }
    static get(id){
        const product=products.find(i=> i.id==id);
        return product;
    }
    static addProductDetails(product){
         const productID= products.length+1;
          product.id=productID;
          products.push(product);
          return product;
    }
   static filter(minPrice,maxPrice,category){
      //  console.log(false||false||undefined);
    const filtered=  products.filter((product)=>{
        return(
          ( !minPrice ||product.price>=minPrice) &&
           (!maxPrice || product.price<=maxPrice) &&
           (!category || product.cateogory==category)
          
          )
    });
         return filtered;
   }

   static rating(userID,productID,rating){
    // 1. validates the users
     const user=   UserModels.getAll().find((r)=> r.userID=userID);
     if(!user){
      return "User not found !"
     }

     // validate products 
     const product= products.find((i)=>i.id=productID);
     console.log(product);
     if(!product){
      return "Product not found !"
     }
// 2. check if there is any ratings and if not then add rating array

      if(!product.rating){
        product.ratings=[];
        product.ratings.push({
          userID:userID,
          rating:rating
        })
      }else{
        // check if user rating is alredy available
        const exitsRatingIndex=product.rating.findIndex((r)=> r.userID=userID);
        if(exitsRatingIndex>=0){
          product.ratings[exitsRatingIndex]={
            userID:userID,
            rating:rating
           };
        }else{
          product.ratings.push({
              userID:userID,
              rating:rating
            })         
        
        }
      }
   }

}

export default ProductModel;

const products = [
    new ProductModel(
      1,
      'Product 1',
      'Description for Product 1',
      19.99,
      'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
      'Cateogory1'
    ),
    new ProductModel(
      2,
      'Product 2',
      'Description for Product 2',
      29.99,
      'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
      'Cateogory2',
      ['M', 'XL']
    ),
    new ProductModel(
      3,
      'Product 3',
      'Description for Product 3',
      39.99,
      'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
      'Cateogory3',
      ['M', 'XL','S']
    )];