

import mongoose from 'mongoose'


const optionGroup_Schema=new mongoose.Schema({
                                                name:{
                                                    
                                                    type:String
                                                }
                                            })

export const option_groups=mongoose.model('option_groups',optionGroup_Schema)