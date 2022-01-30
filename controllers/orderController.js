
let itemscount  = 0 
import * as cartController from './cartController.js'
    
export const checkout =async (req,res,next)=>{

        if(req.user == null ) {

            itemscount =   req.session.cart ? req.session.cart.count : 0

            res.render('login' , { items : req.session.totalitems })

        }

        else {  
            //   
           itemscount =req.user ?  await cartController.numOfItems(req.user.cartId)  : req.session.cart ? req.session.cart.count : 0   

        res.render('checkout' ,{ user : req.user , items : req.session.totalitems })

        }
     }
