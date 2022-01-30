import express from 'express'

import bodyParser from 'body-parser'

import * as controlPanel from '../controllers/controlPanel.js'

import  * as productController from '../controllers/productController.js'



import upload  from '../middlewares/upload.js'

// import  * as categoryController from '../controllers/categoryController'


const _urlParsre=bodyParser.urlencoded({extended:true})

const admin =express.Router()

//admin.use(serveStatic(path.join(path.resolve(),'assets')))

// get Categories for select list 



admin.get('/add-product' ,async (req,res)=> {

const categories = await productController.getDocuments('categories' , {})

console.log(categories)
    
 res.render('ControlPanel/add-product' , { categories })

})

 admin.post('/add-product' ,upload.single('prodImgs'), productController.add)



admin.get('/add-category',_urlParsre)

admin.get('/products', controlPanel.getPanel )

// , (req, res )=>{
//                                                         const prods =   res.locals.prods 
//                                                         const categos   =   res.locals.categos
//                                                         res.render('ControlPanel/products',{prods , categos})
//                                                     })

admin.post('/delete-product', _urlParsre,productController.deleteProduct) //req.params

admin.post('/edit-product', upload.single('prodImgs'),productController.update ) 

admin.get('/getitems/:categoryId' ,controlPanel.getCategoryProducts  )


// async  function getDocuments(collection,query){

// var docs=[]
// await db.mong.connection.collection(collection).find(query).forEach((Element)=>docs.push(Element))
// // console.log(docs)
// return docs
 
// }

// async  function getCategories(){

//     var category=[]
//     const query={}
//     await db.mong.connection.collection('categories').find({}).forEach((Element)=>category.push(Element))
//     return category
     
//     }

export default admin