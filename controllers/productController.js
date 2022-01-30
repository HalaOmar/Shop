import mongoose from 'mongoose'
import products  from "../Models/Product.js"

 export const add        =async (req,res)=>{

							console.log( `admin in /add-product page ${  req.body.categId}`)

							var addedProduct        =await  products.create( {

														productSUK     :req.body.suk,

														name           :req.body.name,

														price          : parseInt ( req.body.price ) ,

														cartDisc       :req.body.cartDisc,

														shortDisc      :req.body.cartDisc,

														image          :req.file?req.file.filename:" ",

														thumb          :req.body.cartDisc,

														location       :req.body.cartDisc,

														categId        :(req.body.categId)

																	}
																	)

						 //  console.log(req.file+ req.file.mimetype+"   OOOOOOOOOOOOOOOOOOOOOOOOk")
						res.redirect('products')

							}

export const get      =async (req,res,next)=>{

let q ={ }, items
if( req.params.categoid !==  '0' ) {
q = { categId : mongoose.Types.ObjectId(req.params.categoid) }
}

const prods        = await getDocuments('products', q)
const categos      = await  getDocuments('categories',{} ,{})

items=req.session.totalitems ?req.session.totalitems:0
console.log('req.params.categid :>>', req.params.categoid)
const categoId=req.params.categoid
console.log('categoId :>>', categoId)
res.render('product-list' , { prods , categos , items ,categoId } )


								}


export const update       = async (req,res,next)=>{



let categories     = await getDocuments('categories',{"name"    :(req.body.catName).trim() } )


					products.updateOne({
								 _id      : mongoose.Types.ObjectId(req.body.prodId)
								},
									[ { $set    :{

											"name"    : req.body.name,

											"price"   :parseInt( req.body.price),

											"shortDisc":req.body.shortDisc,

											"categId" :categories[0]._id,

											"image"   :req.file?req.file.filename:"$image"
										}
								 }]
								)
						.then(async ()=>{

									let prods =await getDocuments('products',{});


									let categos    =await getDocuments('categories',{})



									 res.redirect('products')
									}
							)

								 }

 export const deleteProduct        =async (req,res,next)=>{

						products.findOneAndDelete(

									{
										_id    :mongoose.Types.ObjectId(req.body.prod)
									}           )

									 .then(async ()=>{

										let prods =await getDocuments('products',{});

										let categos=await getDocuments('categories',{})

										res.locals.categos=categos

													res.render('ControlPanel/products',{prods})
												}
											)
										}


export async  function getDocuments(collection,query,option){

	var docs=[]

	await mongoose.connection.collection(collection)

				.find(query,option)

				.forEach((Element)=>docs.push(Element))

				// return array of all documents

	 return docs
	
										 }
export async  function pipelineQuery(pipline){

	return await  products.aggregate(pipline)
}


export const  getProductsInRange= async ( req , res , next )=>{

		const from  = parseInt(  req.params.from )
		
		const to    = parseInt( req.params.to )

		const categoId = req.params.categoId
										console.log('categoId :>>', categoId)
		const query = { $and : [ {price : { $gte : from }} , {price : { $lte : to } } ] }
										
		const prods = await getDocuments('products' , query , { } )
										
		const categIds    = prods.map ( (elem)=> { return elem.categId})
		//{ _id : { $in : categIds }  }                               
		const categos = await getDocuments('categories' , { } )
		
		const items = req.user ? req.session.totalitems : req.session.cart ? req.session.cart.count : 0
		
		res.render ('product-list' , { prods , categos ,categoId, items :req.session.totalitems  })

										   }



export  * from './productController.js'

