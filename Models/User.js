import mongoose from 'mongoose'

const user_Schema=new mongoose.Schema({   
                                FirstName       :{

                                                type:String,

                                                required:true,

                                                trim:true},

                                LastName         :{ 
                                    
                                                type:String,
                                                
                                                required:true,
                                                
                                                trim:true},


                                 email           :{
                                     
                                                    type:String ,
                                                    
                                                    required:true,
                                                    
                                                     unique:true
                                                
                                                },


                                verificationEmail:{
                                    
                                                    type:String,
                                                    
                                                    required: false,
                                                    
                                                    // unique:true
                                                
                                                },


                                address1         :{
                                    
                                                    type:String,
                                                    
                                                    required: false
                                                
                                                },


                                address2         :{
                                    
                                                    type:String,
                                                    
                                                    required: false
                                                
                                                },


                                creditCard       :{
                                    
                                                    type:String,
                                                    
                                                    required: false,
                                                    
                                                    // unique:true
                                                
                                                },


                                userName         :{
                                    
                                                    type:String,
                                                    
                                                    required:true,
                                                    
                                                    // unique:true
                                                
                                                },


                                password         :{
                                    
                                                    type:String,
                                                    
                                                    required:true,
                                                    
                                                    // unique:true
                                                
                                                },


                                city             :{
                                    
                                                    type:String,
                                                    
                                                    required: false
                                                    },


                                state            :{
                                    
                                                    type:String,
                                                    
                                                    required: false
                                                },


                                zip              :{
                                    
                                                    type:Number,
                                                    
                                                    required: false
                                                    },


                                fax              :{
                                                    type:String
                                                   },


                                ip               :{
                                                    type:String
                                                   },


                                phone            :{
                                                    type:String
                                                
                                                   },


                                verification_code:{
                                                    type:String},


                                registration_date:{type:Date} ,

                                cart : {

                                    type : Object
                                } , 

                                cartId :{
                                    type        :mongoose.Types.ObjectId

                                }
                                                  } 
                                                  
                                                  )

export const user=mongoose.model('users',user_Schema)

export default user