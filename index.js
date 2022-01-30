import express from 'express'
import path  from 'path'
import serveStatic from 'serve-static'
import session  from 'express-session'
import sessionStore from 'session-file-store'
import admin from './Routers/admin.js'
import passport  from 'passport'
import user from './Routers/user.js'
import helmet from 'helmet'
import RateLimit from 'express-rate-limit'
import cookieParser from 'cookie-parser' 
import csurf from 'csurf'

import initializeStrategy from './middlewares/grantpassport.js'

import connect_DataBase from './Models/Database.js'

import * as productController from './controllers/productController.js'

import * as userController from './controllers/userController.js'

import * as cartController from './controllers/cartController.js'

import * as orderController from './controllers/orderController.js'

import * as homeController from './controllers/homeController.js'




import { log , warn , error } from './middlewares/logshorter.js'

import  * as custom from 'custom-env'

custom.env('staging')

connect_DataBase()

const _urlParser=express.urlencoded({ extended : true })

const sessionFile = sessionStore(session)

// function csrfValue(req){

//     !req.csrfToken() ? console.log('csrf Failer :>>') : console.log('req :>>', req)
// }
const scrsfProtection = csurf({ sessionKey :'session'}) // return creation and validation middleware, now add it to API input

const server=express()

server.use(cookieParser()) //// need this becouse crsf use cookie

const limiter =  RateLimit( { 

    windowMs : 15 * 60 * 1000 ,
    max : 100 ,
    delayMs : 0
})
// helmet setup now your app is protected by 12 headers from helmet
// server.use(
//     helmet.contentSecurityPolicy({
//       useDefaults: true,
//       directives: {
//         "script-src": ["'self'", "code.jquery.com","stackpath.bootstrapcdn.com","cdn.jsdelivr.net"],
//         "style-src": ["'self'","cdn.jsdelivr.net" , "fonts.googleapis.com" ,"stackpath.bootstrapcdn.com","cdnjs.cloudflare.com"]
//       }
//     })
//    );
// server.use(helmet())
// server.use(limiter)
initializeStrategy(passport)



server.use(serveStatic(path.join(path.resolve(),'assets')))


server.use( session( {  

    secret : 'websiiite' , 

    resave : false , 

    saveUninitialized : false 
                    }
                )
            )


server.use(passport.initialize())

server.use(passport.session())

// server.use( ( req , res , next )=>{ req.session.cart ? req.session.totalitems = req.session.cart.count
//                                                      :req.session.totalitems=0 ; 
//                                                      next()
//                                           })


server.set('view engine','ejs')

server.set('views','views')

// server.use ( (req , res , next ) =>{ res.setHeader('X-Frame-Options' , 'DENY') })

//  ******************************************** ROUTERS *************************************** //

server.use('/admin', admin )

server.use('/user' , user )




// *******************************************************************************************************

server.get('/', homeController.renderhome)

server.get('/new-arraival' , homeController.newArrival )

server.get('/contact',(req,res,next)=>{ res.render('contact' ,  { items :req.session.totalitems} )})

server.get('/checkout', orderController.checkout )

server.get('/login',  scrsfProtection, login )

server.use((req , res ,next ) =>{ console.log('req.session.csrfSecret :>>', req.session.csrfSecret)

next('route')})

server.post('/login' ,  _urlParser ,scrsfProtection, passport.authenticate('local' , {}) , userController.handleUserLogin)      
                                         
                                         
function login(req,res,next){
console.log('I am in loggin function :>>')
res.render('login' , { items:req.session.totalitems , csrfToken : req.csrfToken()} ) }

server.get('/my-account',(req,res,next)=>{ res.render('my-account' ,  { items :req.session.totalitems } )})

server.get('/product-details',(req,res,next)=>{ res.render('product-details' ,  { items :req.session.totalitems } )})

server.get('/product-list/:categoid', productController.get ) 
                                                            
server.get('/wishlist',(req,res,next)=>{ res.render('wishlist' ,  { items :req.session.totalitems } )})

server.get('/cart' , cartController.getCartItems )

server.get('/products-in-range/:from-:to/:categoId', _urlParser ,productController.getProductsInRange)

server.get('/products-in-range/:from-:to', _urlParser ,productController.getProductsInRange)

server.get('/logout' , userController.logout)

// server.use( ( err , req , res , next )=>{ 

// console.log('i am in error handler :>>')
// if( err ) {
// ( err.code !== 'EBADCSRFTOKEN') ? 
// (  next(err)  )           :
// ( res.status(403) ,
// res.send('Form tampered WITH')) 
// }

// else { next(null)}

// } , ( error , req ,res ,next  ) =>{ error !== null ? res.status(403).send(error) : res.send('done')})


// console.log('server.stack :>>', server)

server.listen(3000)