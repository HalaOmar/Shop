import bcrypt from 'bcrypt'

import mongoose from 'mongoose'

import Verifier from 'email-verifier'

import Twilio from 'twilio'

import Cart from '../Models/Cart.js'

import User from '../Models/User.js'

import custom from 'custom-env'

custom.env('staging')


import { log , warn , error } from '../middlewares/logshorter.js'

import * as cartController  from '../controllers/cartController.js'

import { getDocuments } from './productController.js'


export const add= async (req,res,next)=>{
        
    try{

        const hashedPassword    =   await   bcrypt.hash(req.body.password , 10 )

    
        const user              =   new User({  FirstName       : req.body.firstName ,

                                                LastName         : req.body.lastName ,

                                                email           : req.body.email ,

                                                userName         : req.body.email ,

                                                password         : hashedPassword ,

                                                phone            : req.body.phone,

                                                registration_date: Date.now()
                                          }                                          
                                          )
 
             await user.save()  

             res.send ( `the user is signed up successfulle `)
            
                                        }catch (e){

                throw(e)
            }
                                    }

export const update = function (userId , query) {

    User.updateOne({ _id : mongoose.Types.ObjectId(userId) } , [ { $set :query}]).
    then( result => console.log (result )). 
    catch( error => console.log ( error ))
    
}

export const getUser    = async (query) => {

                 const user=   await   User.findOne( query )

                 return user
}

export const logout = function (req , res , next ) {

    req.session.destroy( ()=> {
        
        log ( " Log OUt done" )})

        res.redirect('/')
    
}

export function initializeCart(req) {

    if ( !req.user ) {
    
    const prodId    =   req.body.id

    if ( req.session.cart == null ){

    req.session.cart= {items :{ },count : 0 }

    req.session.cart.items[prodId] = 1

    ++req.session.cart.count
                                                 // console.log("cart data "+ JSON.stringify(req.session.cart) )
                                   } else {

    if (req.session.cart.items[prodId] == null ) {  req.session.cart.items[prodId] = 0 }
               
    req.session.cart.items[prodId] +=1

    ++ req.session.cart.count

   

    

}   return req.session.cart.count  }

return  0

} 

export async function userSignedIn(req) {

    let  cartId ={} ,  useritems = 0

    const prodId    =   req.body.id

    if ( req.user != null ) { // update DATABASE

        if  ( req.user.cartId) {
    log(` the req.user.cartId is ${ req.user.cartId}`) // add the product information to cart 
    const {modifiedCount} =    await  Cart.updateOne({cartId : req.user.cartId , productId : prodId} , 
                                             { $inc : {quentity:1} } ,
                                             { upsert : true }) 

                                        
          
     cartId        = modifiedCount?   req.user.cartId :  cartId                          
                          } else {
                            
    const { _id } =     await cartController.createOne(prodId , req.session.cart.items[prodId] , req.user._id)
    
    cartId        =   _id

                                  }  
    useritems     =      cartController.numOfItems(cartId)                            
                           }
                           console.log('useritems :>>', useritems)

    return useritems
    
}

export const handleUserLogin = async ( req , res ) =>
    
{   let numOfItems=0
    const categories =await getDocuments('categories',{},{})

     try{    

     if (req.session.cart != null) {
      
     numOfItems  =await  cartController.updateCart(req.session.cart.items , req.user.cartId , { upsert : true })

     req.session.totalitems = numOfItems[0].items

    console.log('object :>>', numOfItems)
     res.render('index' , {categories, items :req.session.totalitems } )
    
      } else {

      numOfItems = req.user.cartId? await cartController.numOfItems(req.user.cartId) : 0

      console.log('numOfItems :>>', numOfItems)
      
      req.session.totalitems =  numOfItems != 0 ? numOfItems[0].items : 0

      res.render('index' , { categories , items :req.session.totalitems } )
      }

       }catch(error){throw error}
                                         
      
}
// The email verification API services caches SMTP checks for speed purposes,
//  but you can force a cache refresh by specifying the optional hardRefresh 
//  option when making a query.

export const validateEmail = ( req , res , next  ) => {

    let validateError =[ ]

const verifier = new Verifier ( process.env.VERIFY_EMAIL_API_KEY)

verifier.verify (req.body.email, {retries: 4 , hardRefresh : true} ,( error , response ) =>{

    if(error ){ res.status(404).send( ` Something error happened ${error} `) }
    console.log(response);
    const { formatCheck , smtpCheck , dnsCheck , catchAllCheck} = response

    !formatCheck ? validateError.push("formatCheck is false ") :
    !smtpCheck   ? validateError.push(" smtp Error ") : 
    !dnsCheck    ? validateError.push("dnsCheck Error ") :validateError

    validateError.length > 0 ? res.send( `${validateError}` ) : next()
    
})


}

export const validatePhone = ( req , res , next  ) => { 

    const twilio_account_sid= process.env.TWILIO_ACCOUNT_SID
    const twilio_auth_Token = process.env.TWILIO_AUTH_TOKEN

    const client = new Twilio ( twilio_account_sid , twilio_auth_Token)

    client.verify.services.create({friendlyName: 'Verify_Phone'})
                      .then(service => client.verify.services(service.sid)
                      .verifications
                      .create({to: req.body.phone, channel: 'sms'}) )
                      .then(verification => verification.valid ? next() : res.send(`invalid phone number`))
                      .catch( e => { throw e});

                      
}

export * from './userController.js'