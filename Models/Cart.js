
import mongoose from 'mongoose'

const cartSchema  =   new mongoose.Schema({
                                    
                                    cartId    :{

                                        type : mongoose.Types.ObjectId , 
                                        ref  :'carts'

                                    },

                                    productId : {

                                             type : mongoose.Types.ObjectId ,

                                             ref : 'Product'
                                    } , 
                                    quentity : {

                                        type : Number
                                    } ,

                                    date : {

                                        type : Date
                                    }
                                     
                                    })
cartSchema.methods.getUserId  =   function getUserId() {

                                      return this.userId   
                                      
                                                        }

cartSchema.methods.get_Id     =   function get_Id () {

                                      return this._id
                                                        }                                                        

const Cart  =   mongoose.model('cart' , cartSchema )

export default Cart 