
import mongoose from 'mongoose'

import Stripe from "stripe";

import customEnv from "custom-env";

customEnv.env('staging')

const TEST_KEY = process.env.STRIPE_API_KEY

const stripe = new Stripe(TEST_KEY)

export async function payment(req,res){
 console.log('req.user.lineItems :>>', req.user.lineItems)
    let session  

    try{
         session = await stripe.checkout.sessions.create({

          payment_method_types: ['card'],
          line_items:req.user.lineItems ,
          mode: 'payment',
          success_url: 'http://localhost:3000/user/success',
          cancel_url: 'http://localhost:3000/cancel',
        });

    } catch(e) { console.log( "the error \n is " + e )}
        res.locals.payment_session = session 

        console.log ( "session "+ JSON.stringify(session)  )
      
} 



export default payment