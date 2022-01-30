import Cart from "../Models/Cart.js";

import mongoose from  'mongoose'

import { log , warn , error }  from '../middlewares/logshorter.js'

import * as userController  from "./userController.js";

import * as productController from './productController.js'

export const add = ( req , res , next ) => {
											const userId    = req.user.userName

											const cart = new Cart ( { userId : userId } )
											}

export const update = (  query_document, update_document ) => {
	
			Cart.updateOne( query_document , update_document ).then( ( error , updateResult) =>{

			error?  console.log(error ) : console.log( updateResult)

			const { matchedCount , modifiedCount , _id } = updateResult

			matchedCount >0  ? log(` done ${matchedCount }`) : log( `update operation failed `)
		})
}

export const addToCart = async ( req , res )=>{                                                
console.log("git")
	let newcart={ } , cartId ={} , useritems, items_in_session ,useritems_in_db  = 0

	items_in_session = userController.initializeCart( req )                     //   POPULATE req.sessin.cart useritems_in_db

	useritems_in_db  = await  userController.userSignedIn(req)  //   SAVE THE ITEMS IN DATABASE            
	console.log("useritems_in_db :>>"+useritems_in_db)			   
	useritems_in_db = (useritems_in_db != 'undefined' && useritems_in_db ) ?  useritems_in_db[0].items : 0
	
   useritems     = items_in_session + useritems_in_db

	req.session.totalitems = useritems
   
   res.send(`${req.session.totalitems} `)
											 
											  }

export function getCartId(query) {

 const cart = Cart.findOne(query)

 return cart.userId

}

export async function createOne( prodId , qut , userId) {

	let newcart = new Cart({ cartId :"$_id" ,  productId : prodId , quentity : qut , date :Date.now()})

	const thiscart=   await newcart.save()
							userController.update( userId ,{ "cartId" : newcart._id  }) //JSON.stringify(req.session.cart)
							return thiscart

}

export async function getUserItems(cartId) {

	console.log('cartId :>>', cartId)

return await Cart.aggregate(  [ 
								{ $group : {

								_id : { cartId:"$cartId" , productId  : "$productId"} ,

								itemscount : { $sum : "$quentity"}
								}} , 
								{ $match:{ "_id.cartId":cartId }} ,

								{ $addFields : { itemscount2 : { $sum : "$itemscount"}}}

								] )

}

export async  function updateCart(items , cartId , options) {


let cartitems=	Object.entries(items).map( async([key , val ])=> {

 try{  let result=  await  Cart.updateOne({ cartId : cartId , productId : mongoose.Types.ObjectId(key)} ,

											[ {  $set: { quentity : { $sum :[ "$quentity" , val ]}} }] ,

											options)

											return result
}catch(error){	throw error}
	} )

let x = Promise.all(cartitems).then( (data)=>{ return numOfItems(cartId)})

console.log('x :>>', x)

return x				   

}


export  function numOfItems(cartId) {

	console.log('cartId from usersignedIn:>>', cartId)

	const useritems =   Cart.aggregate([
								{  $group :{

										_id:{ cartId : "$cartId" } ,

										items : { $sum : "$quentity"}

										}} , { $match : { "_id.cartId":cartId} } ])

	return useritems
	}

export async function getCartItems ( req , res , next ) {


let sessioncart , dbcart , cart ,itemData,newitem

if ( req.session.cart == null && req.user ==null){

res.send ( ' your cart is empty ')			
} else {

dbcart =await  userloggedIn(req , res)

if( dbcart == null ) {

console.log('req.session.cart :>>', req.session.cart)

sessioncart=await  getCartFromSession(req,res)

Promise.all(sessioncart).
then ( sessioncart =>{ res.render ('cart', { cart : sessioncart , items:req.session.totalitems })})

} else {

dbcart = dbcart.map( async (item) => {

let	newitem  = { ...item._id , qty: item.itemscount}			

let	itemData = await getItemsData(newitem.productId) // get name , price 

newitem = { ...newitem , ...itemData}


newitem.total = itemData.price * newitem.qty
return newitem


})

Promise.all(dbcart).then ( data => {dbcart = data

console.log('dbcart :>>', dbcart)

res.render ('cart', { cart : dbcart , items:req.session.totalitems })
})
} } }

async function userloggedIn(req , res) {

let usercart

if( req.user) {
// get User from Database
req.user.cartId? usercart = await getUserItems(req.user.cartId ) : res.send(" your cart is empty")
console.log('usercart :>>', usercart)
return usercart
} else { return null}

}

function getCartFromSession(req ,res) {

let usercart

if( !req.user && req.session.cart ){ 

	let sales = Object.entries(req.session.cart.items)
	console.log('sales :>>', sales)
	usercart = getSessionItems(sales)
	return usercart
	
} else {  res.send( " Your cart Is Empty")}


}

 function getSessionItems(sales) {

let items= sales.map( async ([key , quentity])=>{

	let item , itemId

	itemId = mongoose.Types.ObjectId(key)
	item = await getItemsData(itemId)
	item.qty = quentity
	item.total = quentity * item.price
	return item } ) //_id of item stored as key in the object

// Promise.all(items).then( (items)=>{ return items})			
return items
	

}

async function getItemsData(itemId) {

	const query = { _id :  itemId }

	// const option = { "_id":1 , "name" : 1, "price" :1 }

	const itemsArray =  await productController.getDocuments('products', query ,{ })

	return itemsArray[0]
}

function getBillTotal(items ) {

Object.entries(req.session.cart.items).forEach(

( [key , value]) => products.forEach( product => {

if  ( (product._id ).toString()   ==  (key) ) {

product.qty = value

product.total = value * product.price

}
}) )
}



export * from './cartController.js'