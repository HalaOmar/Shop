import mongoose from 'mongoose'

const option_Schema=new mongoose.Schema(
    
                                        {
                                            
                                        name   :{
                                            
                                                type:String
                                        
                                                }}) 

export const options=mongoose.model('options',option_Schema)    