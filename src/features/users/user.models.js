export default class UserModels{
   constructor(id,name,email,password,type){
       this.id=id,
       this.name=name,
       this.email=email,
       this.password=password,
       this.type=type
   }
   static SignUp(user){
      user.id=users.length+1;
      users.push(user);
      return user;
   }
   static SignIn(email,password){
    const user=users.find((data)=> data.email==email && data.password==password);
     return user;
   }
  static getAll(){
    return users;
  }
}

const users = [
    {
    id: 1,
    name: 'Seller User',
    email: 'seller@ecom.com',
    password: 'Password1',
    type: 'seller',
    },
    {
    id: 2,
    name: 'Customer User',
    email: 'customer@ecom.com',
    password: 'Password2',
    type: 'Customer',
    },
]    