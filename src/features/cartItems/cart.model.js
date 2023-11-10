import ProductModel from "../products/product.model.js";
export default class Cartmodels{
    constructor(id,productID,userID,quantity){
        this._id=id;
        this.productID=productID;
        this.userID=userID;
        this.quantity=quantity;
    }
  //  static add(productID,userID,quantity) {
  //       const id=cartItems.length+1;
  //     const cart=  new Cartmodels(id,productID,userID,quantity);
  //     cartItems.push(cart);
  //     return cart;
  //   } 
  //  static get(userID){
  //      const items= cartItems.filter((r)=>r.userID=userID);
  //      return items;
  //  }

  //  static delete(userID,cartID){
  //     const cartIndex=  cartItems.findIndex((r)=> r.id==cartID && r.userID==userID);
  //   //   console.log(cartIndex);
  //     if(cartIndex==-1){
  //          return "Cart is not found"
  //     }else{
  //       cartItems.splice(cartIndex,1);
  //     }
  //  }
}

const cartItems=[
  new Cartmodels(1,2,1,4) 
] 