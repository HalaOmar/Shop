import mongoose from 'mongoose'

export const cartItemSchema   =   new mongoose.Schema( {
    
                                                cartId : { 

                                                    type : mongoose.Types.ObjectId ,
                                                    
                                                    ref : 'Cart'
                                                 } , 

                                                 prodId : {

                                                    type : mongoose.Types.ObjectId , 

                                                    ref : 'Product'

                                                 } ,

                                                 quentity : {

                                                    type : Number , 
                                                  
                                                 }
                                                }
                                                 
                                                )

export const CartItem = mongoose.model( cartItemSchema )

export default CartItem