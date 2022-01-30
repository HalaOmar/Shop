import mongoose from 'mongoose'

const productOptions_Schema=new mongoose.Schema( 
                                                {
    


                                                option_id       :{
                                                    
                                                                    type:mongoose.Types.ObjectId ,
                                                                    
                                                                    ref:'options'
                                                                
                                                                },


                                                product_id      :{
                                                    
                                                                    type:mongoose.Types.ObjectId ,
                                                                    
                                                                    ref:'products'
                                                                
                                                                },

                                                group_id        :{
                                                    
                                                                    type:mongoose.Types.ObjectId  ,
                                                                    
                                                                    ref:'option_groups'
                                                                
                                                                },


                                                price_increment :{
                                                    
                                                                    type:Number
                                                                
                                                                }
                                                            })

export const product_options=new mongoose.model('product_options',productOptions_Schema)  