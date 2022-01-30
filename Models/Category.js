
import mongoose from 'mongoose'

const category_Schema=new mongoose.Schema({
                        
                                            name    :{
                                                
                                                type:String
                                            },
                                            icon    :{
                                                type : String
                                            }
                                        })

export const category=mongoose.model('categories',category_Schema)       

export default category