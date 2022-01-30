import { category } from "../Models/Category.js" //fancy constructor



const add       =       (req,res,next)=>{


        const newCategory       =new category({
                                                name:"furniture"
                                                })

                                newCategory.save()

                                res.send("category added"+newCategory)

                                 }

const update    =       (req,res,next)=>{

        category.updateOne({},{ })

                                 }

const del       =(req,res,next)=>{

        category.findOneAndDelete()


                                }

const get       =   async ()=>{
        
                     const categos= await  getDocuments({})
                     
                     return categos
                     }          
       ///////////////////////////////////////////////////////////////////////////////////////////

async  function getDocuments(query){

var docs=[]
await category.find(query).forEach((Element)=>docs.push(Element))
// console.log(docs)
return docs
 
}