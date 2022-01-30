import Product from '../Models/Product.js'

import Category from '../Models/Category.js'

import mongoose from 'mongoose'

export const getPanel = async ( req , res , next )=>{

const products = await  Product.find( { })

const categories = await Category.find({ })

console.log('products :>>', products)

res.status(202).render('ControlPanel/products-v1' , { prods : products , categos : categories})

}

export const getCategoryProducts =async ( req , res , next ) =>{ 

    const products = await Product.find ( { categId : mongoose.Types.ObjectId( req.params.categoryId) })

    const categories = await Category.find({ })

    res.status(200).render('ControlPanel/products-v1' , { prods : products , categos : categories})


}