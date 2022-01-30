import products from "../Models/Product.js";
import { getDocuments , pipelineQuery} from "./productController.js";


export const renderhome =async ( req , res , next) =>{ 

    const products =await getDocuments('products',{},{})
    const categories = await getDocuments('categories',{ },{})
    console.log('products :>>', products)
    console.log('categories :>>', categories)
    res.render('index' , { products , categories , items :req.session.totalitems })
}

export const newArrival = async (req , res ,next  ) =>{

    const pipeline = [  { $sort :{ updateDate: -1} }]

    const products_des= await pipelineQuery(pipeline)

    const categos      = await  getDocuments('categories',{} ,{})

    res.render('product-list' , { prods : products_des , categos , items : req.session.totalitems})

}