import mongoose from 'mongoose'

const orders_Schema=new mongoose.Schema({   
    
                                            
                                            user_id     :{
                                                
                                                            type:mongoose.Types.ObjectId,
                                                            
                                                            ref:'users',
                                                            
                                                            required:true},

                                            amount      :{
                                                
                                                            type:Number,
                                                            
                                                            required:true
                                                        
                                                        },

                                            shipName    :{
                                                
                                                            type:String,
                                                            
                                                            required:true
                                                        
                                                        },
                                            shipaddress :{
                                                
                                                            type:String,
                                                            
                                                            required:true
                                                        },
                                            city        :{
                                                
                                                            type:String,
                                                            
                                                            required:true
                                                        
                                                        },
                                            state       :{
                                                
                                                            type:String,
                                                            
                                                            required:true
                                                        
                                                        },
                                            zip         :{
                                                
                                                            type:Number,
                                                            
                                                            required:true
                                                        
                                                        },
                                            country     :{
                                                
                                                            type:String,
                                                            
                                                            required:true
                                                        
                                                        },

                                            phone       :{
                                                
                                                            type:String,
                                                            
                                                            required:true
                                                        
                                                        },
                                            fax         :{
                                                
                                                            type:String,
                                                            
                                                            required:true
                                                        
                                                        },
                                            tax         :{
                                                
                                                            type:Number,
                                                            
                                                            required:true
                                                        
                                                        },
                                            email       :{
                                                
                                                            type:String,
                                                            
                                                            required:true
                                                        
                                                        },


                                            date        :{
                                                
                                                            type:Date,default:Date.now}
                                                        
                                                        })

export const orders=mongoose.model('order',orders_Schema)