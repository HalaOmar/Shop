import mongoose from 'mongoose'

export default async function connect_DataBase() {

    try{
const url                   =process.env.MONGO_URI 

const mong                  =await mongoose.connect(url)//Socket 

const database              = mong.connection


 mong?console.log( `mongoose driver Connected to Database ${ database}` ):console.log("Eroor")

 return database
    } catch (e) { throw e}
    
} 


// mongodb://admin@localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false


   



 



