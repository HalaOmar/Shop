import mongoose from 'mongoose'

import {getUserItems} from './cartController.js'

import { getDocuments } from './productController.js'



import {payment } from '../middlewares/payment.js'

export const getUserCart = async ( req , res , next )=>{

    const usercart = await getUserItems(req.user.cartId)

    // console.log('usercart :>>', usercart)

    req.user.usercart = usercart

    next()

}

export const getLineItems =async ( req , res , next ) => { 

    const usercart = req.user.usercart
    let lineItems = [ ]
    lineItems =await usercart.map(async ( { _id , itemscount } )=>{
        
        let itemData = await getItemData(_id.productId)

        return { 
            price_data :{
                        currency : "usd" ,
                        product_data : {
                            name :itemData.name 
                                       },
                        unit_amount :itemData.price *100,
                        },
            quantity : parseInt(itemscount) }
} )


Promise.all(lineItems).then( lineItems => {req.user.lineItems=lineItems ;next()} ).catch( e=> { throw e})

}

export const sendConfirmationCode = async ( req , res , next) =>{
    
    
    next()}

export const callStripe = async ( req , res , next) => {

    await payment(req,res)

    res.redirect(res.locals.payment_session.url)

    next()
    }

export const makeOrder = async ( req , res , next )=>{ next()}



async function getItemData (itemId) {

    const namesArry = await  getDocuments('products',{ _id : mongoose.Types.ObjectId(itemId)},{ }) // return array 
  
    return namesArry[0]
  
  
  }

