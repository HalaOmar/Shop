

import  LocalStrategy from 'passport-local'
import * as user from "../controllers/userController.js";
import bcrypt from 'bcrypt'

const Strategy  =    LocalStrategy.Strategy

export async function initializeStrategy(passport) {
    
            const verify = async (username , password , done) => {
                                
                console.log(` call strategy to get crediential fields `)
                    try { 

                const authenticatedUser  = await user.getUser( { userName : username } )

                console.log( `authenticatedUser is ${ authenticatedUser}`)

                if ( authenticatedUser == null ) { 
                    
                    console.log( ` No user in DB ${authenticatedUser}`)

                  passport.loginFail={ message : " Incorrect Username "}

                  return done ( null ,false )
                }

                if ( 
                    ! await bcrypt.compare( password , authenticatedUser.password)
                ) {

                passport.loginFail={ message : " Incorrect Username "}
                return   done( null , false , { message : ' Incorrect Password'})

                    }
                    
                    console.log (  `U r athenticated user ${ authenticatedUser.FirstName}` )
                return done ( null , authenticatedUser)

                    //  GET THE USER OF THIS ID FROM THE DATABASE 
                }   catch( e ) { 
                                console.log(e )
                    throw (e)
                } } 
     
const configStrategy    =   new Strategy( { usernameField : 'email' },  verify ) 

                                                                      
                                        

passport.use(configStrategy) 

passport.serializeUser ( async (user , done ) => { 
                                                    console.log(` I am in the serialize method `)
                                                 const userdate = { userName : user.userName   }

                                                   return  done ( null , user.userName)
                                                        
                                                    
                                                    }) 

passport.deserializeUser( async ( id ,done) => {  

    // THE USER HAS PASSPORT IN HIS SESSION GET THIS ID FROM STORE 
    //  NOW CALL MY CB FUNCTION TO GET THE USER FROM THE DATABASE 
    // GET uSER BY ID
    console.log(` deserialize ${ id }`)
    
    const authenticatedUser  = await user.getUser( { userName : id } )

    

    return done( null , authenticatedUser)

})  }

// console.log("Initialization done ")



export default initializeStrategy