import mongoose from 'mongoose'

const order_Details_Schema=new mongoose.Schema({

                                                 user_id    :{
                                                     
                                                    type:mongoose.Types.ObjectId,
                                                    
                                                    ref:'users'},


                                                prod_id     :{
                                                    
                                                    type:mongoose.Types.ObjectId,
                                                    
                                                    ref:'products'
                                                },


                                                order_id    :{
                                                    
                                                    type:mongoose.Types.ObjectId,
                                                    
                                                    ref:'orders'
                                                },


                                                quantity    :{
                                                    
                                                    type:Number
                                                },


                                                price       :{
                                                    
                                                    type:Number
                                                },


                                                name        :{
                                                    
                                                    type:String
                                                
                                                }
                                                })

export const  order_Details=mongoose.model('order_Details',order_Details_Schema) 