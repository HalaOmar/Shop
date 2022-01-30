import multer from 'multer'
import path from 'path'


const optionsObj={


    "destination":function (req,file,cb){
                                            cb(null,path.join(path.resolve(),'/assets/uploads'))

                                         } ,

    filename:function(req,file,cb){

                                            const ext           = path.extname(file.originalname)

                                            cb(null,Date.now()+ext)
                                     }                      


}
const storage=multer.diskStorage(optionsObj)

const upload = multer({
                        storage:storage ,
                        
                        fileFilter:function (req,file,callback) {
console.log(file.mimetype)
                            if  (   
                                
                                    file.mimetype == "image/png" ||

                                    file.mimetype == "image/jpeg"
                                 ) { 
                                     callback ( null , true )
                                } else {

                                    console.log ( " Only jpg or png image file accepted")

                                    callback ( null , false)

                              }
                            
                        } , 

                        limits : {

                            fileSize: 1024 * 1024 * 2
                        }

})

export default upload