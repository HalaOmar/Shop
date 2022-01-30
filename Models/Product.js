import mongoose from "mongoose"

const product_Schema=new mongoose.Schema({
                                            productSUK:String,


                                            name        :{
                                                
                                                type :String ,
                                                
                                                required:true
                                            
                                                    },

                                            price       :Number,

                                            cartDisc    :String,

                                            shortDisc   :String,

                                            image       :String,

                                            thumb       :String,

                                            categId     :{ 
                                                
                                                            type:mongoose.Types.ObjectId , 
                                                            
                                                            ref:'categories'},
                                                            
                                            updateDate   :{ 
                                                
                                                            type: Date, 
                                                            
                                                            default: Date.now 
                                                        
                                                            },


                                            location      :String
                                        
                                                                    })

export  const products=mongoose.model('product',product_Schema) //return subclass of Model class

              products.createIndexes({price : 1} )

export default products