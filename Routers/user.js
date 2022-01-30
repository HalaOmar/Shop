
import express from "express";

const user=express.Router();

import serveStatic from 'serve-static'

import * as userController from '../controllers/userController.js'

import * as paymentController from '../controllers/paymentController.js'

import * as cartController from '../controllers/cartController.js'

import payment from '../middlewares/payment.js'

const _urlParser=express.urlencoded({ extended : true })

//user.use(serveStatic())

user.post('/add-user' , _urlParser , userController.validateEmail , userController.validatePhone ,  userController.add )

user.get('/my-account')

user.get('product-details')

user.get('/cart')

user.get('contact')



user.post('/add-to-cart' ,  _urlParser , cartController.addToCart )

user.post('/create-checkout-session' , _urlParser , paymentController.getUserCart, paymentController.getLineItems,

                                      userController.validatePhone, paymentController.callStripe ,
                                      
                                      paymentController.makeOrder
                                      )


user.get('/success' , ( req,res) =>{
  res.render('success')
})

export default user

